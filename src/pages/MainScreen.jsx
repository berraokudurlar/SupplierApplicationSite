import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


import Header from "../components/Header";
import turksatLogo from "../assets/photos/turksatlogo.png";


export default function MainScreen() {
  const { t } = useTranslation("", { keyPrefix: "main_screen" });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toast = useRef(null); 
  const recaptchaRef = useRef(null);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const onFinish = (values) => {
    if (!values.email || !values.password) {
      toast.current.show({
        severity: 'error',
        summary: t("missing_email_password"),
        life: 3000
      });
      return;
    }

    if (!captchaValue) {
      toast.current.show({
        severity: 'error',
        summary: t("captcha_not_done"),
        life: 3000
      });
      return;

    }

    toast.current.show({
      severity: 'success',
      summary: t("success_message"), 
      life: 3000
    });

  };

  return (
    <div className="main-background">

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <Toast ref={toast} />
      
      <div className="login-box" style={{ height: "100%" }}>
       

        <Splitter style={{ height: "100%", background: "transparent" }} stateStorage="local">

           <SplitterPanel
            style={{
              background: "transparent",
              padding: "2rem",
              paddingRight: "4rem",
              width: "550px",
              minWidth: "550px",
              maxWidth: "550px",
            }}
          >
            <div
              className="login-column"
              style={{
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                background: "transparent",
              }}
            >
              <h2>{t("login_title")}</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onFinish({
                    email: e.target.email.value,
                    password: e.target.password.value,
                  });
                }}
              >
                {/* Email */}
                <div className="group-input" style={{ marginBottom: "1rem", gap: "1rem" }} autocomplete="off">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <i className="pi pi-envelope" style={{ fontSize: "1.2rem", color: "#21578A" }} />
                    <span style={{ color: "red" }}>*</span>
                    <InputText 
                    name="email" 
                    placeholder={t("email_placeholder")}
                    style={{ flex: 1 }} 
                    autoComplete="off"/>
                  </div>
                </div>

                {/* Password */}
                <div className="group-input" style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <i className="pi pi-lock"  style={{ fontSize: "1.2rem", color: "#21578A" }} />
                    <span style={{ color: "red" }}>*</span>
                    <Password name="password" 
                    placeholder={t("password_placeholder")} 
                    style={{ flex: 1 }} 
                    toggleMask
                    feedback={false}
                    autoComplete="off"/>
                  </div>
                </div>

                {/* Login Row */}
                <div
                  className="login-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "2rem",
                  }}
                >

                    <Link to="/forgot-password" className="forgot-link">
                    {t("forgot_password")}
                  </Link>

                  <Button type="submit" className="login-btn" label={t("login_btn")} />
               
                </div>

                {/* CAPTCHA */}
                <div className="captcha-container" style={{ marginTop: "1rem" }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M"
                    onChange={(value) => setCaptchaValue(value)}

                    /* 
                    onChange={handleRecaptcha} */
                  />
                </div>
              </form>

              {/* Register Section */}
              <div className="register-section" style={{ marginTop: "2rem" }}>
                <Link to="/register">
                  <Button type="button" className="register-btn" label={t("become_supplier")} />
                </Link>
              </div>
            </div>
          </SplitterPanel>
          
          <SplitterPanel
            size={200}
            minSize={150}
            maxSize={200}
            className="left-panel"
            style={{
              background: "transparent",
              padding: "2rem",
              paddingTop: "4rem",
              paddingRight: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "3rem",
              boxSizing: "border-box",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div className="logo-container">
              <a
                href="https://www.turksat.com.tr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={turksatLogo} alt="Türksat" className="logo" />
              </a>
            </div>

            <div
              className="contact-info"
              style={{ whiteSpace: "pre-line", textAlign: "center" }}
            >
              {t("contact_info")}
            </div>

            <div className="faq">
              <Link to="/faq" className="faq-link">
                {t("faq")}
              </Link>
            </div>
          </SplitterPanel>
         
        </Splitter>
      </div>
    </div>
  );
}