"use client";

import React, { useEffect } from "react";
import { Row, Col, Typography } from 'antd';
import {ConfigProvider} from "antd";
import theme from "./themeConfig";
import { Chart } from "@antv/g2";
import useFetchSWR from "../hooks/useFetchSWR";

const HomePage = () => {

  //Main Page - Chart 1
  const { data: dataChart1, isLoading: isChart1Loading, error: dataChart1Error } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_topXLaytime/2024-02-01%2000:00:00&2024-02-29%2000:00:00&15/?=json')
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

  //Main Page - Chart 2
  const { data: dataChart2, isLoading: isChart2Loading, error: dataChart2Error } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_TopXVesselsDeadTime/15/?=json')
  useEffect(() => { if(dataChart2) {  
    console.log(dataChart2.recordset) 
    const chart = new Chart({container: 'chart2-container'});
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

  //Main Page - Chart 3
  const { data: dataChart3, isLoading: isChart3Loading, error: dataChart3Error } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_occupancyByTime/2024-02-01 00:00:00&2024-02-29 00:00:00&0/?=json')
  useEffect(() => { if(dataChart3) {  
    console.log(dataChart3.recordset) 
    const chart = new Chart({container: 'chart3-container'});
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

  //Main Page - Chart 4  
  const { data: dataChart4, isLoading: isChart4Loading, error: dataChart4Error  } = useFetchSWR('http://178.18.253.143:8080/sp-api/spr_Funnel/2024-02-01 00:00:00&2024-02-29 00:00:00/?=json')
  useEffect(() => { if(dataChart4) {  
    console.log(dataChart4.recordset) 
    const chart = new Chart({
      container: 'chart4-container',
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
    <Row gutter={[26, 36]}>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 1
        </Typography.Title>
        <div id='chart1-container' 
          style={{
            padding: 24,
            background: "#e7eff7",
            borderRadius: 3,
            maxHeight: '37vh'
          }}
        >
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 2
        </Typography.Title>
        <div id='chart2-container' 
          style={{
            padding: 24,
            background: "#e7eff7",
            borderRadius: 3,
            maxHeight: '37vh'
          }}
        >
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 3
        </Typography.Title>
        <div id='chart3-container' 
          style={{
            padding: 24,
            background: "#e7eff7",
            borderRadius: 3,
            maxHeight: '37vh'
          }}
        >
        </div>
      </Col>
      <Col xs={24} xl={12}>
        <Typography.Title level={3} style={{ margin: '16px 0' }}>
          Chart 4
        </Typography.Title>
        <div id='chart4-container' 
          style={{
            padding: 24,
            background: "#e7eff7",
            borderRadius: 3,
            maxHeight: '37vh'
          }}
        >
        </div>
      </Col>
    </Row>
  </ConfigProvider>
)};

export default HomePage;
