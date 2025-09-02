// src/components/PhoneCodePicker.jsx
import React from "react";
import { Form } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

export function PhoneCodePicker({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <Form.Item label={t("registration.labels.phone")} required>
      <PhoneInput
        country="tr"
        value={value}
        onChange={onChange}
        placeholder={t("registration.labels.phone")}
        inputClass="phone-input"
        buttonClass="phone-button"
        dropdownClass="phone-dropdown"
      />
    </Form.Item>
  );
}
