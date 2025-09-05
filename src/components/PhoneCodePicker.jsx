// src/components/PrimePhoneCodePicker.jsx
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

export function PhoneCodePicker({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="form-row">

      <label htmlFor="phone" className="form-label">
        {t("registration.labels.phone")} <span style={{ color: "red" }}>*</span>
      </label>

      <PhoneInput
        country="tr"
        value={value}
        onChange={onChange}
        placeholder={t("registration.labels.phone")}
        inputClass="phone-input"
        buttonClass="phone-button"
        dropdownClass="phone-dropdown"s      />
    </div>
  );
}
