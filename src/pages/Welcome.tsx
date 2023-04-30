import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import RcResizeObserver from 'rc-resize-observer';
import { useState, useEffect } from 'react';
import { theme } from 'antd';
import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import { queryPanalData, queryLineData, queryPieData } from '@/services/ant-design-pro/api';
import dayjs from 'dayjs';

dayjs.locale('zh-cn'); 
const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

const pieStyle = {
  width: 300,
  height: 300,
}

const ParkingLine: React.FC = () => {
  const [data, setData] = useState<API.LineData>([]);
  useEffect(() => {
    queryLineData().then((res) => {
      setData(res.data);
    })
  }, []);
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };
  return <Line {...config} />;
}

const ParkingPie: React.FC = () => {
  const [data, setData] = useState<API.PieData>([]);
  useEffect(() => {
    queryPieData().then((res) => {
      setData(res.data);
    });
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} style={pieStyle} />;
}

const ParkingPanel: React.FC = () => {

  const [data, setData] = useState<API.PanelData>({});

  useEffect(() => {
    queryPanalData().then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <StatisticCard.Group direction='row'>
      <StatisticCard
        statistic={{
          title: '营收额',
          value: data.orderCount,
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />
      <StatisticCard
        statistic={{
          title: '车流量',
          value: data.traffic,
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />
      <StatisticCard
        statistic={{
          title: '用户数',
          value: data.userCount,
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />
      <StatisticCard
        statistic={{
          title: '空余车位',
          value: data.vacParkingSpace,
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />
    </StatisticCard.Group>
  )
}

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="数据概览"
        extra={dayjs().format('YYYY年MM月DD日 dddd')}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split='horizontal'>
          <ProCard split='horizontal'>
            <ParkingPanel />
          </ProCard>
          <ProCard
            split='vertical'
            gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}
            title="停车场数据"
          >
            <ProCard split='vertical' colSpan="73%">
              <ParkingLine />
            </ProCard>
            <ProCard colSpan="27%">
              <ParkingPie />
            </ProCard>
          </ProCard>

        </ProCard>
      </ProCard>

    </RcResizeObserver>

  );
};

export default Welcome;
