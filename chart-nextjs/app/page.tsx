"use client";

import React from "react";
import Link from "next/link";
import { SmileFilled } from "@ant-design/icons";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Text from 'antd/lib/typography'
import { Breadcrumb, Row, Col, Typography } from 'antd';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Slider,
  Switch,
  ConfigProvider,
} from "antd";
import theme from "./themeConfig";

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <Row gutter={[26, 56]}>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 1
        </Typography.Title>
        <div
          style={{
            padding: 24,
            minHeight: 'max-content',
            background: "#52c41a",
            borderRadius: 3,
          }}
        >
          Content
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 2
        </Typography.Title>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#52c41a",
            borderRadius: 3,
          }}
        >
          Content
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 3
        </Typography.Title>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#52c41a",
            borderRadius: 3,
          }}
        >
          Content
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 4
        </Typography.Title>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#52c41a",
            borderRadius: 3,
          }}
        >
          Content
        </div>
      </Col>
    </Row>
  </ConfigProvider>
);

export default HomePage;
