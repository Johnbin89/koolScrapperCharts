"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography } from 'antd';
import {ConfigProvider} from "antd";
import theme from "../themeConfig";
import useFetchSWR from "../../hooks/useFetchSWR";
import { Chart } from "@antv/g2";




const Chart2 = () => {
  
  const { data: dataChart2, isLoading, error: dataError } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_TopXVesselsDeadTime/15/?=json')

  useEffect(() => { if(dataChart2) {  
    console.log(dataChart2.recordset) 
    const chart = new Chart({container: 'container'});
    chart.options({
      type: "interval",
      autoFit: true,
      data: dataChart2.recordset,
      encode: { x: "VNAME", y: "GenAvgDeadTimePerBerthing" },
      interaction: { elementHighlight: { background: true } },
    });
    chart.axisX().attr('title', 'Vessel').style('titleFontSize', 20);
    chart.axisY().attr('title', 'Average Dead Time per Berthing').style('titleFontSize', 20);;
    chart.render()
  }}, [dataChart2]);




  return (
  <ConfigProvider theme={theme}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 2
        </Typography.Title>
        <div id='container' 
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

export default Chart2;
