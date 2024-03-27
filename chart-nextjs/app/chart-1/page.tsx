"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography } from 'antd';
import {ConfigProvider} from "antd";
import theme from "../themeConfig";
import useFetchSWR from "../../hooks/useFetchSWR";
import { Chart } from "@antv/g2";




const Chart1 = () => {
  
  const { data: dataChart1, isLoading, error: dataError } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_topXLaytime/2024-02-01%2000:00:00&2024-02-29%2000:00:00&15/?=json')

  useEffect(() => { if(dataChart1) {  
    console.log(dataChart1.recordset) 
    const chart = new Chart({container: 'chart1-container'});
    chart.options({
      type: "interval",
      autoFit: true,
      data: dataChart1.recordset,
      encode: { x: "Vessel", y: "TotalLaytime" },
      transform: [{ type: "stackY" }],
      interaction: { elementHighlight: { background: true } },
    });
    chart.axisX().attr('title', 'Vessel').style('titleFontSize', 20);;
    chart.axisY().attr('title', 'Total Laytime').style('titleFontSize', 20);;
    chart.render()
  }}, [dataChart1]);




  return (
  <ConfigProvider theme={theme}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 1
        </Typography.Title>
        <div id='chart1-container' 
          style={{
            padding: 24,
            minHeight: '80dvh',
            background: "#e7eff7",
            borderRadius: 4,
            boxSizing: 'border-box'
          }}
        >

        </div>
  </ConfigProvider>
)};

export default Chart1;
