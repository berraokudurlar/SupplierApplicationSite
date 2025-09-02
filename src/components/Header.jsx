import React from "react";
import { Row, Col, Space, Button } from "antd";
import {
  SunOutlined,
  MoonOutlined,
  LinkedinOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import LanguageSwitchButton from "./LanguageSwitchButton";
import turksatLogo from "../assets/photos/turksatlogo.png";


export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="website-header">
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        {/* Left icons */}
        <Col flex="none" className="left-icons">
          <Space size="large">
            <a
              href="https://www.linkedin.com/company/turksat/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined />
            </a>
            <a
              href="https://x.com/turksat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XOutlined />
            </a>
            <a
              href="https://www.youtube.com/user/turksatpr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeOutlined />
            </a>
          </Space>
        </Col>

          {/* Center logo */}
        <Col flex="auto" className="center-logo" style={{ textAlign: "center" }}>
          <a
            href="https://www.turksat.com.tr"
                target="_blank"
                  rel="noopener noreferrer"
                >
            <img src={turksatLogo} alt="Türksat" className="logo" />
          </a>
        </Col>

        {/* Right buttons */}
        <Col flex="none" className="right-buttons">
          <Space size="middle">
            <LanguageSwitchButton />
            <Button onClick={toggleDarkMode} className="dark-mode-button">
              {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </Button>
          </Space>
        </Col>
      </Row>
    </header>
  );
}
