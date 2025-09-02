import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Layout, Steps, Form, Input, Button, Select, Checkbox, Upload } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import GoHome from "../components/GoHome";
import { CountryPicker } from "../components/CountryPicker";
import { PhoneCodePicker } from "../components/PhoneCodePicker";
import UploadFiles from "../components/UploadFiles";

const { Step } = Steps;
const { Option } = Select;
const { Content } = Layout;

export default function Register() {

  const { t, i18n } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [form, setForm] = useState({
    newPassword: "",
    repeatPassword: "",
    companyName: "",
    businessField: "",
    companyType: "",
    taxId: "",
    taxOffice: "",
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    email: "",
    country: "",
    province: "",
    district: "",
    address: "",
    corporateMail: "",
    corporateFax: "",
    signatureFile: null,
    acceptTerms: false,
    integrityConfirmed: false,
    captchaValue: null,
  });

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const steps = useMemo(
    () => [
      { key: "company", label: t("registration.steps.company") },
      { key: "contact_info", label: t("registration.steps.contact_info") },
      { key: "authorized_person", label: t("registration.steps.authorized_person") },
      { key: "files", label: t("registration.steps.files") },
    ],
    [t]
  );

  const stepValid = useMemo(() => {
    switch (steps[stepIndex].key) {
      case "company":
        return (
          form.newPassword &&
          form.repeatPassword &&
          form.companyName.trim() &&
          form.companyType &&
          form.taxId.trim() &&
          form.taxOffice.trim()
        );
      case "contact_info":
        return (
          form.country.trim() && 
          form.province.trim() &&
          form.district.trim() &&
          form.address.trim() &&
          form.corporateMail.trim()
        );
      case "authorized_person":
        return (
          form.firstName.trim() &&
          form.lastName.trim() &&
          form.email.trim() &&
          (form.phone || "").replace(/\D/g, "").length >= 7
        );
      case "files":
        return (
          form.signatureFile &&
          form.acceptTerms && 
          form.integrityConfirmed && 
          form.captchaValue
        );
      default:
        return false;
    }
  }, [form, stepIndex, steps]);

  const next = () => stepValid && setStepIndex(stepIndex + 1);
  const back = () => setStepIndex(stepIndex - 1);

  const handleSubmit = async () => {
    if (!stepValid) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v instanceof File) fd.append(k, v);
        else fd.append(k, v);
      });

      console.log("Submitting:", [...fd.keys()]);
      alert(t("registration.messages.submit_success"));
    } catch (err) {
      alert(t("registration.messages.submit_error"));
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (steps[stepIndex].key) {
      case "company":
        return (
          <>
            {/* Company step fields */}

            <h3>
              {t("registration.labels.first_name")}
            </h3>

            <Form.Item label={t("registration.labels.new_password")} required>
              <Input.Password
                value={form.newPassword}
                onChange={(e) => update({ newPassword: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.new_password_again")} required>
              <Input.Password
                value={form.repeatPassword}
                onChange={(e) => update({ repeatPassword: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.company_name")} required>
              <Input
                value={form.companyName}
                onChange={(e) => update({ companyName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.business_field")}>
              <Input
                value={form.businessField}
                onChange={(e) => update({ businessField: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.company_type")} required>
              <Select
                value={form.companyType}
                onChange={(v) => update({ companyType: v })}
              >
                <Option value="limited">{t("registration.labels.limited")}</Option>
                <Option value="anonymous">{t("registration.labels.anonymous")}</Option>
                <Option value="sole">{t("registration.labels.sole")}</Option>
              </Select>
            </Form.Item>
            <Form.Item label={t("registration.labels.taxId")} required>
              <Input
                value={form.taxId}
                onChange={(e) => update({ taxId: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.tax_office")} required>
              <Input
                value={form.taxOffice}
                onChange={(e) => update({ taxOffice: e.target.value })}
              />
            </Form.Item>
          </>
        );

      case "contact_info":
        return (
          <>
            {/* Contact info step fields */}
            <Form.Item label={t("registration.labels.country")} required>
              <CountryPicker
                value={form.country}
                onChange={(country) => update({ country })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.province")} required>
              <Input
                value={form.province}
                onChange={(e) => update({ province: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.district")} required>
              <Input
                value={form.district}
                onChange={(e) => update({ district: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.address")} required>
              <Input
                value={form.address}
                onChange={(e) => update({ address: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.corporate_mail")} required>
              <Input
                value={form.corporateMail}
                onChange={(e) => update({ corporateMail: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.corporate_fax")}>
              <Input
                value={form.corporateFax}
                onChange={(e) => update({ corporateFax: e.target.value })}
              />
            </Form.Item>
          </>
        );

      case "authorized_person":
        return (
          <>
            <Form.Item label={t("registration.labels.first_name")} required>
              <Input
                value={form.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.last_name")} required>
              <Input
                value={form.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label={t("registration.labels.title")}>
              <Input
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </Form.Item>
            <PhoneCodePicker
              value={form.phone}
              onChange={(phone) => update({ phone })}
            />
            <Form.Item label={t("registration.labels.email")} required>
              <Input
                value={form.email}
                onChange={(e) => update({ email: e.target.value })}
              />
            </Form.Item>
          </>
        );

      case "files":
        return (
          <>
            <p>{t("registration.information.signature_instruction")}</p>
            
            <Form.Item label={t("registration.labels.signature_circular")} required>
              <UploadFiles
                onFileChange={(file) => update({ signatureFile: file })}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={form.integrityConfirmed}
                onChange={(e) => update({ integrityConfirmed: e.target.checked })}
              >
                {t("registration.information.integrity")}
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Checkbox
                checked={form.acceptTerms}
                onChange={(e) => update({ acceptTerms: e.target.checked })}
              >
                {t("registration.information.terms")}
              </Checkbox>
            </Form.Item>
            <div className="captcha-container">
              <p>{t("recaptcha.instruction")}</p>
              <ReCAPTCHA
                sitekey="blank_for_now"
                onChange={(v) => update({ captchaValue: v })}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-background">

      <GoHome />
        
        <div className="register-container">
           <Layout style={{ 
                  height: "100%",
                  background: "transparent",
                  }}>
          
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <Content>
                  
          <h2>{t("registration.title")}</h2>

          <Steps current={stepIndex} className="steps" labelPlacement="vertical">
            {steps.map((s) => (
              <Step key={s.key} title={s.label} />
            ))}
          </Steps>

          <div style={{ height: "20px" }} />
          

          <Form 
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          colon={false}
          
          >{renderStepContent()}</Form>

          <div className="register-buttons">
            <Button
              className="register-back-btn"
              onClick={back}
              disabled={stepIndex === 0}
            >
              {t("registration.buttons.back")}
            </Button>

            {stepIndex < steps.length - 1 ? (
              <Button
                type="primary"
                className="register-next-btn"
                onClick={next}
                disabled={!stepValid}
              >
                {t("registration.buttons.next")}
              </Button>
            ) : (
              <Button
                type="primary"
                className="register-next-btn"
                onClick={handleSubmit}
                disabled={!stepValid || submitting}
              >
                {submitting
                  ? t("registration.buttons.submitting")
                  : t("registration.buttons.submit")}
              </Button>
            )}
           </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}
