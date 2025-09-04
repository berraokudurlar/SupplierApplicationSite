import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Steps } from "primereact/steps";

import Header from "../components/Header";
import GoHome from "../components/GoHome";


import "primeicons/primeicons.css";

export default function EmailVerification() {
  const { t } = useTranslation("", { keyPrefix: "email_verification" });

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
 

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const itemRenderer = (item, itemIndex) => {
    const isActive = step === itemIndex;
    const isComplete = step > itemIndex;

    const backgroundColor = isActive || isComplete ? 'var(--primary-color)' : 'var(--surface-b)';
    const textColor = isActive || isComplete ? 'var(--surface-b)' : 'var(--text-color-secondary)';

    return (
      <span
        className="inline-flex align-items-center justify-content-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
        style={{ backgroundColor, color: textColor, marginTop: '-25px' }}
        onClick={() => setStep(itemIndex)}
      >
        <i className={`${item.icon} text-xl`} />
      </span>
    );
  };

  const items = [
    { icon: 'pi pi-user', template: (item) => itemRenderer(item, 0) },
    { icon: 'pi pi-spinner-dotted', template: (item) => itemRenderer(item, 1) },
    { icon: 'pi pi-verified', template: (item) => itemRenderer(item, 2) }
  ];

  const sendVerificationEmail = async () => {
    if (!email) {
      showToast("warn", t("email"), t("email_required"));
      return;
    }
    if (!captchaValue) {
      showToast("warn", t("captcha"), t("captcha_not_done"));
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      showToast("success", t("verification_email"), t("sent"));
      setStep(1);
    } catch (err) {
      console.error(err);
      showToast("error", t("verification_email"), t("send_error"));
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      showToast("warn", t("verification_code"), t("code_required"));
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      showToast("success", t("verification_code"), t("verified"));
      setStep(2);
    } catch (err) {
      console.error(err);
      showToast("error", t("verification_code"), t("verify_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-background">

      <Toast ref={toast} />

      <GoHome />

      <Header isDarkMode={false} toggleDarkMode={() => {}} />

      <div className="ev-box">
        <div className="ev-h2">
          <h2>{t("title")}</h2>
        </div>
       
        <Steps model={items} activeIndex={step} readOnly={true} className="p-steps" />

        <div className="ev-step-content">
          {step === 0 && (
            <>
              <div className="ev-input-row">
                <label>{t("email")}</label>
                <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="captcha-container">
                <ReCAPTCHA sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M" onChange={(v) => setCaptchaValue(v)} />
              </div>
              <div className="ev-button-row">
                <Button label={t("send_verification_email")} className="ev-next-btn" loading={loading} onClick={sendVerificationEmail} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="ev-input-row">
                <label>{t("verification_code")}</label>
                <InputText value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="123456" />
              </div>
              <div className="ev-button-row">
                <Button label={t("back")} className="ev-back-btn" onClick={() => setStep(0)} />
                <Button label={t("verify")} className="ev-next-btn" onClick={verifyCode} />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="ev-success">
              <h3>{t("verification_success")}</h3>
              <Button label={t("proceed_to_login")} className="ev-next-btn" onClick={() => (window.location.href = "/")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
