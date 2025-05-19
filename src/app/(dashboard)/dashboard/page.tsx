'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Divider, List, Tag, Spin } from 'antd';
import { 
  ShoppingCartOutlined, 
  DollarOutlined, 
  ShoppingOutlined, 
  WarningOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { 
  products, 
  orders, 
  dailyRevenueData, 
  categorySales, 
  marketplaceSales 
} from '../../../mockData/mockData';

const { Title } = Typography;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
    
  const totalOrders = orders.filter(order => order.status === 'completed').length;
  
  const totalProducts = products.length;
  
  const lowStockProducts = products.filter(
    product => product.stockLevel < product.lowStockThreshold
  );
  
  const revenueChartOptions = {
    chart: {
      type: 'area',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'Revenue Trend (Last 30 Days)'
    },
    xAxis: {
      categories: dailyRevenueData.map(item => item.date),
      labels: {
        step: 5
      }
    },
    yAxis: {
      title: {
        text: 'Revenue ($)'
      }
    },
    series: [{
      name: 'Revenue',
      data: dailyRevenueData.map(item => item.revenue),
      color: '#1677ff'
    }],
    credits: {
      enabled: false
    }
  };
  
  const categorySalesOptions = {
    chart: {
      type: 'pie',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'Sales by Category'
    },
    series: [{
      name: 'Revenue',
      data: categorySales.map(item => ({
        name: item.category,
        y: item.revenue
      }))
    }],
    credits: {
      enabled: false
    }
  };
  
  const marketplaceOptions = {
    chart: {
      type: 'column',
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: 'Sales by Marketplace'
    },
    xAxis: {
      categories: marketplaceSales.map(item => item.marketplace)
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [
      {
        name: 'Revenue',
        data: marketplaceSales.map(item => item.revenue)
      },
      {
        name: 'Orders',
        data: marketplaceSales.map(item => item.orders)
      }
    ],
    credits: {
      enabled: false
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <div>
      <Title level={2}>Dashboard Overview</Title>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
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
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                suffix="USD"
              />
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <Statistic
                title="Total Orders"
                value={totalOrders}
                valueStyle={{ color: '#1677ff' }}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <Statistic
                title="Total Products"
                value={totalProducts}
                valueStyle={{ color: '#722ed1' }}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <Statistic
                title="Low Stock Alerts"
                value={lowStockProducts.length}
                valueStyle={{ color: lowStockProducts.length > 0 ? '#cf1322' : '#3f8600' }}
                prefix={<WarningOutlined />}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
      
      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={categorySalesOptions} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card>
            <HighchartsReact highcharts={Highcharts} options={marketplaceOptions} />
          </Card>
        </Col>
      </Row>
      
      {/* Low Stock Products */}
      <Card className="mb-6">
        <Title level={4}>
          <WarningOutlined className="text-red-500 mr-2" />
          Low Stock Products
        </Title>
        <Divider />
        
        {lowStockProducts.length === 0 ? (
          <p>No low stock products at the moment.</p>
        ) : (
          <List
            dataSource={lowStockProducts}
            renderItem={(product) => (
              <List.Item
                actions={[
                  <Tag color={product.stockLevel === 0 ? 'red' : 'orange'} key="stock-tag">
                    {product.stockLevel === 0 ? 'Out of Stock' : `${product.stockLevel} left`}
                  </Tag>
                ]}
              >
                <List.Item.Meta
                  title={product.name}
                  description={`Category: ${product.category} | Price: $${product.price}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
}
