import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import Header from "../components/Header"; 
import GoHome from "../components/GoHome";


export default function ForgotPassword() {

  const { t, i18n } = useTranslation("", { keyPrefix: "forgot_password" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleEmailSubmit = () => {
    if (!email) {
      message.error(t("enter_valid_email"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(t("verification_code_sent"));
      nextStep();
    }, 1500);
  };

  const handleCodeSubmit = () => {
    if (!verificationCode) {
      message.error(t("enter_verification_code"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(t("code_verified"));
      nextStep();
    }, 1500);
  };

  const handlePasswordReset = () => {
    if (!newPassword) {
      message.error(t("enter_new_password"));
      return;
    }
    if (!captchaValue) {
      message.error(t("please_verify_captcha"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(t("password_reset_success"));
      setEmail("");
      setVerificationCode("");
      setNewPassword("");
      setCaptchaValue(null);
      setCurrentStep(0);
    }, 1500);
  };

  return (

    <div className="main-background">

    <GoHome />

    <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="register-container">
        {currentStep === 0 && (
          <>
            <h2>{t("title")}</h2>
            <Form layout="vertical">
              <Form.Item label={t("email")} required>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-group"
                />
              </Form.Item>
              <Button
                type="primary"
                className="login-btn"
                just
                onClick={handleEmailSubmit}
                loading={loading}
                block
              >
                {t("send_verification_code")}
              </Button>
            </Form>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2>{t("enter_verification_code_title")}</h2>
            <Form layout="vertical">
              <Form.Item label={t("verification_code")} required>
                <Input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="input-group"
                />
              </Form.Item>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button onClick={prevStep}>{t("back")}</Button>
                <Button
                  type="primary"
                  onClick={handleCodeSubmit}
                  loading={loading}
                  block
                >
                  {t("verify_code")}
                </Button>
              </div>
            </Form>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2>{t("reset_password_title")}</h2>
            <Form layout="vertical">
              <Form.Item label={t("new_password")} required>
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-group"
                />
              </Form.Item>
              <div className="captcha-container">
                <ReCAPTCHA
                  sitekey=""
                  onChange={handleCaptchaChange}
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button onClick={prevStep}>{t("back")}</Button>
                <Button
                  type="primary"
                  onClick={handlePasswordReset}
                  loading={loading}
                  block
                >
                  {t("reset_password")}
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
