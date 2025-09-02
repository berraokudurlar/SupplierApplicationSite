import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Link } from "react-router-dom";

export default function GoHome() {
  return (
    
      <Link to="/">
        <FloatButton icon={<HomeOutlined />}
         className="go-home-btn" />
      </Link>
    
  );
}
