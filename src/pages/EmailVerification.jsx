import React, { useState } from "react";
import { Form, Input, Button, message, Steps } from "antd";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import GoHome from "../components/GoHome";

const { Step } = Steps;

export default function EmailVerification() {
  const { t, i18n } = useTranslation("", { keyPrefix: "email_verification" });
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const sendVerificationEmail = () => {
    if (!captchaValue) {
      message.error(t("please_verify_captcha"));
      return;
    }
    if (!email) {
      message.error(t("email_required"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(t("verification_email_sent"));
      setCurrentStep(1);
    }, 1500);
  };

  const verifyCode = () => {
    if (verificationCode === "123456") { // Replace with real API check
      message.success(t("email_verified"));
      setCurrentStep(2);
    } else {
      message.error(t("invalid_code"));
    }
  };

  return (
    <div className="main-background">

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    
      <div className="register-container">
        <h2>{t("title")}</h2>
        <Steps current={currentStep} className="steps">
          <Step title={t("enter_email")} icon={<UserOutlined />}  />
          <Step title={t("verify_code")} icons={(<SolutionOutlined />)} />
          <Step title={t("success")} icons={(<SmileOutlined />)}/>
        </Steps>

        <div className="register-step-content">
          {currentStep === 0 && (
            <Form layout="vertical">
              <Form.Item label={t("email")} required>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-group"
                />
              </Form.Item>

              
              <div className="captcha-container">
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={handleCaptchaChange}
                />
              </div>
              
              <Button
                type="primary"
                className="register-next-btn"
                onClick={sendVerificationEmail}
                loading={loading}
              >
                {t("send_verification_email")}
              </Button>
            </Form>
          )}

          {currentStep === 1 && (
            <Form layout="vertical">
              <Form.Item label={t("verification_code")} required>
                <Input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="input-group"
                />
              </Form.Item>
              <div className="register-buttons">
                <Button
                  className="register-back-btn"
                  onClick={() => setCurrentStep(0)}
                >
                  {t("back")}
                </Button>
                <Button
                  className="register-next-btn"
                  onClick={verifyCode}
                >
                  {t("verify")}
                </Button>
              </div>
            </Form>
          )}

          {currentStep === 2 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h3>{t("verification_success")}</h3>
              <Button
                type="primary"
                className="register-next-btn"
                onClick={() => window.location.href = "/login"}
              >
                {t("proceed_to_login")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
