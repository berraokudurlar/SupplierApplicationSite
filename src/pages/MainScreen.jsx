import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { Layout, Splitter, Form, Input, Button } from "antd";
import turksatLogo from "../assets/photos/turksatlogo.png";
import Header from "../components/Header";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

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
          <Splitter.Panel
            className="left-panel"
            defaultSize={450}
            min={450}
            max={450}
            style={{
              background: "transparent",
              padding: "2rem",
              paddingTop: "4rem",
              paddingRight: "4.5rem",
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
                paddingTop: "1rem",
              }}
            >
              <div className="login-column" style={{ width: "100%", maxWidth: "400px" }}>
                <h2>{t("login_title")}</h2>

                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: t("email_required") },
                      { type: "email", message: t("email_invalid") },
                    ]}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <MailOutlined style={{ fontSize: "1.2rem", color: "#21578A" }} />
                      <span style={{ color: "red" }}>*</span>
                      <Input placeholder={t("email_placeholder")} style={{ flex: 1 }} />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: t("password_required") }]}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <LockOutlined style={{ fontSize: "1.2rem", color: "#21578A" }} />
                       <span style={{ color: "red" }}>*</span>
                      <Input.Password placeholder={t("password_placeholder")} style={{ flex: 1 }} />
                    </div>
                  </Form.Item>
            
                                
                  <div
                    className="login-row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between", // button on left, link on right
                      alignItems: "center",            // vertical alignment
                      gap: "1rem",                      // spacing if needed
                      marginTop: "1rem",                // spacing from elements above
                    }}
                  >
                    <Button type="primary" htmlType="submit" className="login-btn">
                      {t("login_btn")}
                    </Button>

                    <Link to="/forgot-password" className="forgot-link">
                      {t("forgot_password")}
                    </Link>
                  </div>
   
                  <div className="captcha-container">
                    <ReCAPTCHA
                      sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M"
                      onChange={(value) => setCaptchaValue(value)}
                    />
                  </div>
             
              </Form>
         

                <div className="register-section">
                    <Link to="/register">
                      <Button type="default" className="register-btn">
                        {t("become_supplier")}
                      </Button>
                    </Link>
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