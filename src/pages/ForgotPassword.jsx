import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import Header from "../components/Header";
import GoHome from "../components/GoHome";

export default function ForgotPassword() {
  const { t } = useTranslation("", { keyPrefix: "forgot_password" });

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const handleSendCode = async () => {
    if (!email) {
      showToast("warn", t("email"), t("email_required"));
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      showToast("success", t("verification_code"));
      handleNextStep();
    } catch (err) {
      console.error(err);
      showToast("error", t("send_error"));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      showToast("warn", t("verification_code"), t("code_required"));
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      showToast("success", t("verification_code"), t("verified"));
      handleNextStep();
    } catch (err) {
      console.error(err);
      showToast("error", t("verification_code"), t("verify_error"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      showToast("warn", t("new_password"), t("password_required"));
      return;
    }
    if (!captchaValue) {
      showToast("warn", "Captcha", t("captcha_not_done"));
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      showToast("success", t("reset_password"), t("successful"));
      setEmail(""); 
      setVerificationCode(""); 
      setNewPassword(""); 
      setCaptchaValue(null);
      setStep(0);
    } catch (err) {
      console.error(err);
      showToast("error", t("reset_password"), t("reset_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-background">
      <Toast ref={toast} />

      <GoHome />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="fp-box">
        {step === 0 && (
          <>
            <h2>{t("title")}</h2>
            <div className="fp-input-row">
              <label>{t("email")}</label>
              <InputText 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="fp-button-row" style={{ display: "flex", gap: "1rem" }}>
              <Button 
                label={t("send_verification_code")} 
                onClick={handleSendCode} 
                loading={loading} 
                className="fp-button"   
              />
            </div>  
          </>
        )}

        {step === 1 && (
          <>
            <h2>{t("enter_verification_code_title")}</h2>
            <div className="fp-input-row">
              <label>{t("verification_code")}</label>
              <InputText 
                value={verificationCode} 
                onChange={(e) => setVerificationCode(e.target.value)} 
                placeholder="123456" 
              />
            </div>
            <div className="fp-button-row" style={{ display: "flex", gap: "1rem" }}>
              <Button label={t("back")} onClick={handlePrevStep} className="fp-back-btn"/>
              <Button 
                label={t("verify_code")} 
                onClick={handleVerifyCode} 
                loading={loading} 
                className="fp-button"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>{t("reset_password_title")}</h2>
            <div className="fp-input-row">
              <label>{t("new_password")}</label>
              <InputText 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            <div className="captcha-container">
              <ReCAPTCHA 
                sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M"
                onChange={(v) => setCaptchaValue(v)} 
              />
            </div>
            <div className="fp-button-row" style={{ display: "flex", gap: "1rem" }}>
              <Button label={t("back")} onClick={handlePrevStep} className="fp-back-btn" />
              <Button 
                label={t("reset_password")} 
                onClick={handleResetPassword} 
                loading={loading} 
                className="fp-button"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
