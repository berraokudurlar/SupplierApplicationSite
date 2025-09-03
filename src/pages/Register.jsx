import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

import { Steps } from "primereact/steps";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Select } from "antd";


import Header from "../components/Header";
import GoHome from "../components/GoHome";
import { CountryPicker } from "../components/CountryPicker";
import { PhoneCodePicker } from "../components/PhoneCodePicker";
import UploadFiles from "../components/UploadFiles"; 

export default function Register() {
  const { t } = useTranslation();
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
    country: "",
    province: "",
    district: "",
    address: "",
    corporateMail: "",
    corporateFax: "",
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    email: "",
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
        ) 
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
      const body = { ...form };
      if (body.signatureFile instanceof File) body.signatureFile = null;

      const res = await fetch("http://localhost:8080/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        alert(t("registration.messages.submit_error") + ": " + text);
      } else {
        alert(t("registration.messages.submit_success"));
        setForm({
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
        setStepIndex(0);
      }
    } catch (err) {
      console.error(err);
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
          <h3>İlk girişiniz olduğu için parola oluşturmanız gerekmektedir.</h3>

          <div className="form-row">
            <label>
              {t("registration.labels.new_password")} <span className="required">*</span>
            </label>
            <Password
              value={form.newPassword}
              onChange={(e) => update({ newPassword: e.target.value })}
              toggleMask
              feedback={false}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.new_password_again")} <span className="required">*</span>
            </label>
            <Password
              value={form.repeatPassword}
              onChange={(e) => update({ repeatPassword: e.target.value })}
              toggleMask
              feedback={false}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.company_name")} <span className="required">*</span>
            </label>
            <InputText
              value={form.companyName}
              onChange={(e) => update({ companyName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>{t("registration.labels.business_field")}</label>
            <InputText
              value={form.businessField}
              onChange={(e) => update({ businessField: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.company_type")} <span className="required">*</span>
            </label>
            <Select
              value={form.companyType}
              onChange={(v) => update({ companyType: v })}
            >
              <Option value="limited">{t("registration.labels.limited")}</Option>
              <Option value="anonymous">{t("registration.labels.anonymous")}</Option>
              <Option value="sole">{t("registration.labels.sole")}</Option>
            </Select>
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.taxId")} <span className="required">*</span>
            </label>
            <InputText
              value={form.taxId}
              onChange={(e) => update({ taxId: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.tax_office")} <span className="required">*</span>
            </label>
            <InputText
              value={form.taxOffice}
              onChange={(e) => update({ taxOffice: e.target.value })}
            />
          </div>
        </>
      );

    case "contact_info":
      return (
        <>
          <div className="form-row">
            <label>
              {t("registration.labels.country")} <span className="required">*</span>
            </label>
            <CountryPicker
              value={form.country}
              onChange={(country) => update({ country })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.province")} <span className="required">*</span>
            </label>
            <InputText
              value={form.province}
              onChange={(e) => update({ province: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.district")} <span className="required">*</span>
            </label>
            <InputText
              value={form.district}
              onChange={(e) => update({ district: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.address")} <span className="required">*</span>
            </label>
            <InputText
              value={form.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.corporate_mail")} <span className="required">*</span>
            </label>
            <InputText
              value={form.corporateMail}
              onChange={(e) => update({ corporateMail: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>{t("registration.labels.corporate_fax")}</label>
            <InputText
              value={form.corporateFax}
              onChange={(e) => update({ corporateFax: e.target.value })}
            />
          </div>
        </>
      );

    case "authorized_person":
      return (
        <>
          <div className="form-row">
            <label>
              {t("registration.labels.first_name")} <span className="required">*</span>
            </label>
            <InputText
              value={form.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.last_name")} <span className="required">*</span>
            </label>
            <InputText
              value={form.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>{t("registration.labels.title")}</label>
            <InputText
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
            />
          </div>

          <div className="form-row">
            <PhoneCodePicker
              value={form.phone}
              onChange={(phone) => update({ phone })}
            />
          </div>

          <div className="form-row">
            <label>
              {t("registration.labels.email")} <span className="required">*</span>
            </label>
            <InputText
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
        </>
      );

    case "files":
      return (
        <>
          <p>{t("registration.information.signature_instruction")}</p>

          <div className="form-row">
            <label>
              {t("registration.labels.signature_circular")} <span className="required">*</span>
            </label>
            <UploadFiles
              onFileChange={(file) => update({ signatureFile: file })}
            />
          </div>

          <div className="form-row">
            <Checkbox
              inputId="integrity"
              checked={form.integrityConfirmed}
              onChange={(e) => update({ integrityConfirmed: e.checked })}
            />
            <label htmlFor="integrity">
              {t("registration.information.integrity")} <span className="required">*</span>
            </label>
          </div>

          <div className="form-row">
            <Checkbox
              inputId="terms"
              checked={form.acceptTerms}
              onChange={(e) => update({ acceptTerms: e.checked })}
            />
            <label htmlFor="terms">
              {t("registration.information.terms")} <span className="required">*</span>
            </label>
          </div>

          <div className="captcha-container">
            <p>{t("recaptcha.instruction")}</p>
            <ReCAPTCHA
              sitekey="6LcXl7ErAAAAAA03pTGms34aop_luxwYl7r0P_0M"
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

        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <h2>{t("registration.title")}</h2>

        {/* Steps */}
        <Steps
          model={steps}
          activeIndex={stepIndex}
          onSelect={(e) => setStepIndex(e.index)}
          className="steps"
        />

        <div style={{ height: "20px" }} />
        {renderStepContent()}

        {/* Buttons */}
        <div className="register-buttons">
          <Button
            className="register-back-btn"
            onClick={back}
            disabled={stepIndex === 0}
            label={t("registration.buttons.back")}
          />
          {stepIndex < steps.length - 1 ? (
            <Button
              className="register-next-btn"
              onClick={next}
              disabled={!stepValid}
              label={t("registration.buttons.next")}
            />
          ) : (
            <Button
              className="register-next-btn"
              onClick={handleSubmit}
              disabled={!stepValid || submitting}
              label={
                submitting
                  ? t("registration.buttons.submitting")
                  : t("registration.buttons.submit")
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
