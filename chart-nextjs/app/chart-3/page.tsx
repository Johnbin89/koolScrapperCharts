"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography } from 'antd';
import {ConfigProvider} from "antd";
import theme from "../themeConfig";
import useFetchSWR from "../../hooks/useFetchSWR";
import { Chart } from "@antv/g2";




const Chart3 = () => {
  
  const { data: dataChart3, isLoading, error: dataError } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_occupancyByTime/2024-02-01 00:00:00&2024-02-29 00:00:00&0/?=json')

  useEffect(() => { if(dataChart3) {  
    console.log(dataChart3.recordset) 
    const chart = new Chart({container: 'container'});
    chart.options({
      type: "line",
      autoFit: true,
      data: dataChart3.recordset,
      encode: { x: (d: any) => new Date(d.DT), y: "AllBerths" },
      interaction: { elementHighlight: { background: true } },
    });
    chart.axisX().attr('title', 'DateTime').style('titleFontSize', 20);;
    chart.axisY().attr('title', 'Daily Berth Occupancy').style('titleFontSize', 20);
    chart.render()
  }}, [dataChart3]);




  return (
  <ConfigProvider theme={theme}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 3
        </Typography.Title>
        <div id='container' 
          style={{
            padding: 24,
            minHeight: '82dvh',
            background: "#e7eff7",
            borderRadius: 4,
            boxSizing: 'border-box'
          }}
        >

        </div>
  </ConfigProvider>
)};

export default Chart3;
