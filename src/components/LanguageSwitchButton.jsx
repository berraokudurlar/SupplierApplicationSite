import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Segmented } from 'antd';

const LanguageSwitchButton = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className= "language-switcher">
      <Segmented
        options={[
          { label: "TR", value: "tr" },
          { label: "EN", value: "en" }
        ]}
        value={i18n.language}          
        onChange={(val) => switchLanguage(val)}
      />
    </div>
  );
}

export default LanguageSwitchButton;