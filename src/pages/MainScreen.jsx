import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { Layout, Splitter, Form, Input, Button } from "antd";
import turksatLogo from "../assets/photos/turksatlogo.png";
import Header from "../components/Header";

export default function MainScreen() {
  const { t } = useTranslation("", { keyPrefix: "main_screen" });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const onFinish = (values) => {
    if (!captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }
    console.log("Form values:", values, "Captcha:", captchaValue);
  };

  return (
    <div className="main-background">
      <div className="login-box">
        <Layout style={{ height: "100%", background: "transparent" }}>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

          <Splitter style={{ height: "100%" }}>
            {/* Left Panel */}
            {/* Left Panel */}
<Splitter.Panel
  className="left-panel"
  defaultSize={400}
  min={400}
  max={500}
  style={{
    background: "transparent",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "2rem", // spacing between children
    boxSizing: "border-box",
    height: "100%",
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
    style={{
      whiteSpace: "pre-line",
      textAlign: "center",
    }}
  >
    {t("contact_info")}
  </div>

  <div className="faq">
    <Link to="/faq" className="faq-link">
      {t("faq")}
    </Link>
  </div>
</Splitter.Panel>

            {/* Right Panel */}
            <Splitter.Panel style={{ padding: "2rem" }}>
              <Layout.Content
                style={{
                  background: "transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="login-column" style={{ width: "100%", maxWidth: "400px" }}>
                  <h2>{t("login_title")}</h2>

                  <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      label={
                        <>
                          {t("email")} <span className="required"> </span>
                        </>
                      }
                      name="email"
                      rules={[
                        { required: true, message: t("email_required") },
                        { type: "email", message: t("email_invalid") },
                      ]}
                    >
                      <Input placeholder={t("email_placeholder")} />
                    </Form.Item>

                    <Form.Item
                      label={
                        <>
                          {t("password")} <span className="required"> </span>
                        </>
                      }
                      name="password"
                      rules={[{ required: true, message: t("password_required") }]}
                    >
                      <Input.Password placeholder={t("password_placeholder")} />
                    </Form.Item>

                    <div className="captcha-container">
                      <ReCAPTCHA
                        sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M"
                        onChange={(value) => setCaptchaValue(value)}
                      />
                    </div>

                    <div className="form-links">
                      <Link to="/forgot-password" className="forgot-link">
                        {t("forgot_password")}
                      </Link>
                    </div>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-btn" block>
                        {t("login_btn")}
                      </Button>
                    </Form.Item>
                  </Form>

                  <div className="register-section">
                    <p>
                      <Link to="/register">
                        <Button type="default" className="register-btn">
                          {t("become_supplier")}
                        </Button>
                      </Link>
                    </p>
                  </div>
                </div>
              </Layout.Content>
            </Splitter.Panel>
          </Splitter>
        </Layout>
      </div>
    </div>
  );
}
