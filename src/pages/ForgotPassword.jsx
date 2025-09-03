import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

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

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleSendCode = async () => {
    if (!email) {
      alert(t("email") + " " + "is required"); 
      return;
    }
    setLoading(true);
    try {
      // Replace with your API call
      await new Promise((res) => setTimeout(res, 1000));
      alert(t("verification_code") + " " + t("sent"));
      handleNextStep();
    } catch (err) {
      console.error(err);
      alert("Error sending code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert(t("verification_code") + " " + "is required");
      return;
    }
    setLoading(true);
    try {
      // Replace with your API verification call
      await new Promise((res) => setTimeout(res, 1000));
      handleNextStep();
    } catch (err) {
      console.error(err);
      alert("Error verifying code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert(t("new_password") + " " + "is required");
      return;
    }
    if (!captchaValue) {
      alert("Please verify CAPTCHA");
      return;
    }
    setLoading(true);
    try {
      // Replace with your API reset password call
      await new Promise((res) => setTimeout(res, 1000));
      alert(t("reset_password") + " " + "successful");
      setEmail(""); 
      setVerificationCode(""); 
      setNewPassword(""); 
      setCaptchaValue(null);
      setStep(0);
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="main-background">

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
              sitekey="YOUR_SITE_KEY" 
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
