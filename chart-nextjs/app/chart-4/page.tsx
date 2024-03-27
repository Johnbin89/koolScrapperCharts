"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography } from 'antd';
import {ConfigProvider} from "antd";
import theme from "../themeConfig";
import useFetchSWR from "../../hooks/useFetchSWR";
import { Chart } from "@antv/g2";




const Chart4 = () => {
  

  const { data: dataChart4, isLoading, error: dataError } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_Funnel/2024-02-01 00:00:00&2024-02-29 00:00:00/?=json')

  useEffect(() => { if(dataChart4) {  
    console.log(dataChart4.recordset) 
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });
    chart.coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 });
    let arrayData = []
    for (const key in dataChart4.recordset[0]) {
      arrayData.push({name: key, value: dataChart4.recordset[0][key]});
    }
    console.log(arrayData)
    chart
      .interval()
      .data(arrayData)
      .transform({ type: 'stackY' })
      .encode('y', 'value')
      .encode('color', 'name')
      .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
      .label({
        position: 'inside',
        text: (data: any) => `${data.name}`,
        transform: [{ type: 'overflowHide' }],
      })
      .tooltip((data) => ({
        name: data.name,
        value: `${data.value}`,
      }));
    
    
    
    chart.render();
  }}, [dataChart4]);




  return (
  <ConfigProvider theme={theme}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 4
        </Typography.Title>
        <div id='container' 
          style={{
            padding: 24,
            minHeight: '77dvh',
            background: "#e7eff7",
            borderRadius: 4,
            boxSizing: 'border-box'
          }}
        >

        </div>
  </ConfigProvider>
)};

export default Chart4;
