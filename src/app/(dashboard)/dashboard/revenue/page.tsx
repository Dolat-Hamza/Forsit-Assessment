'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Radio, 
  Select, 
  Typography, 
  DatePicker, 
  Table, 
  Spin,
  Statistic
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { motion } from 'framer-motion';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { 
  dailyRevenueData, 
  weeklyRevenueData, 
  monthlyRevenueData, 
  annualRevenueData,
  categorySales,
  marketplaceSales,
  orders,
  products,
  getRevenueByCategory
} from '../../../../mockData/mockData';
import type { TimeRange } from '../../../../types';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function RevenuePage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTimeRangeChange = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const getTimeRangeData = () => {
    switch (timeRange) {
      case 'daily':
        return dailyRevenueData;
      case 'weekly':
        return weeklyRevenueData;
      case 'monthly':
        return monthlyRevenueData;
      case 'annually':
        return annualRevenueData;
      default:
        return dailyRevenueData;
    }
  };
  
  const getFilteredData = () => {
    if (selectedCategory === 'all') {
      return getTimeRangeData();
    }
    
    return getRevenueByCategory(orders, products, selectedCategory);
  };
  
  const data = getFilteredData();
  
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  
  const percentageChange = 12.5; // In a real app, calculate this based on previous period
  
  const revenueChartOptions = {
    chart: {
      type: 'area',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: `Revenue Trend (${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})`
    },
    xAxis: {
      categories: data.map(item => item.date),
      labels: {
        step: timeRange === 'daily' ? 5 : 1
      }
    },
    yAxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    series: [{
      name: 'Revenue',
      data: data.map(item => item.revenue),
      color: '#1677ff'
    }],
    credits: {
      enabled: false
    }
  };
  
  const ordersChartOptions = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: `Orders Trend (${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})`
    },
    xAxis: {
      categories: data.map(item => item.date),
      labels: {
        step: timeRange === 'daily' ? 5 : 1
      }
    },
    yAxis: {
      title: {
        text: 'Number of Orders'
      }
    },
    series: [{
      name: 'Orders',
      data: data.map(item => item.orders),
      color: '#52c41a'
    }],
    credits: {
      enabled: false
    }
  };
  
  const categoryComparisonOptions = {
    chart: {
      type: 'bar',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'Revenue by Category'
    },
    xAxis: {
      categories: categorySales.map(item => item.category)
    },
    yAxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    series: [{
      name: 'Revenue',
      data: categorySales.map(item => item.revenue),
      color: '#722ed1'
    }],
    credits: {
      enabled: false
    }
  };
  
  const marketplaceComparisonOptions = {
    chart: {
      type: 'pie',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'Revenue by Marketplace'
    },
    series: [{
      name: 'Revenue',
      data: marketplaceSales.map(item => ({
        name: item.marketplace,
        y: item.revenue
      }))
    }],
    credits: {
      enabled: false
    }
  };
  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => `$${value.toFixed(2)}`,
      sorter: (a: { revenue: number }, b: { revenue: number }) => a.revenue - b.revenue,
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a: { orders: number }, b: { orders: number }) => a.orders - b.orders,
    },
  ];
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categorySales.map(category => ({
      value: category.category,
      label: category.category
    }))
  ];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <div>
      <Title level={2}>Revenue Analysis</Title>
      
      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <div className="mb-2">Time Range:</div>
            <Radio.Group value={timeRange} onChange={handleTimeRangeChange}>
              <Radio.Button value="daily">Daily</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
              <Radio.Button value="monthly">Monthly</Radio.Button>
              <Radio.Button value="annually">Annually</Radio.Button>
            </Radio.Group>
          </Col>
          
          <Col xs={24} md={8}>
            <div className="mb-2">Category:</div>
            <Select
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categoryOptions}
            />
          </Col>
          
          <Col xs={24} md={8}>
            <div className="mb-2">Date Range:</div>
            <RangePicker style={{ width: '100%' }} />
          </Col>
        </Row>
      </Card>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <Statistic
                title="Total Revenue"
                value={totalRevenue}
                precision={2}
                valueStyle={{ color: percentageChange >= 0 ? '#3f8600' : '#cf1322' }}
                prefix="$"
                suffix={
                  <span>
                    {percentageChange >= 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    {Math.abs(percentageChange)}%
                  </span>
                }
              />
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <Statistic
                title="Total Orders"
                value={totalOrders}
                valueStyle={{ color: percentageChange >= 0 ? '#3f8600' : '#cf1322' }}
                suffix={
                  <span>
                    {percentageChange >= 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    {Math.abs(percentageChange)}%
                  </span>
                }
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
      
      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={ordersChartOptions} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={categoryComparisonOptions} />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={marketplaceComparisonOptions} />
          </Card>
        </Col>
      </Row>
      
      {/* Data Table */}
      <Card>
        <Title level={4}>Revenue Data</Title>
        <Table 
          dataSource={data.map((item, index) => ({ ...item, key: index }))} 
          columns={columns} 
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
