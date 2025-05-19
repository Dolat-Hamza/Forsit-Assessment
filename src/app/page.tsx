'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { RocketOutlined, DashboardOutlined, AreaChartOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-16">
          <nav className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold">EcomDash</div>
            <div className="flex gap-3">
              <Link href="/login">
                <Button type="primary" ghost>
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button type="default">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Title level={1} className="text-white text-4xl md:text-5xl font-bold mb-6">
                Powerful E-Commerce Analytics Dashboard
              </Title>
              <Paragraph className="text-blue-100 text-lg mb-8">
                Centralize your e-commerce data from Amazon & Walmart. Monitor sales, 
                track inventory, and make data-driven decisions to grow your business.
              </Paragraph>
              <Space>
                <Link href="/register">
                  <Button type="primary" size="large" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button ghost size="large" className="border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </Space>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img 
                  src="https://placehold.co/600x400/e2e8f0/1e40af?text=Dashboard+Preview" 
                  alt="Dashboard Preview" 
                  className="rounded"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2}>Powerful Features for E-Commerce Managers</Title>
            <Paragraph className="text-gray-500 text-lg">
              Everything you need to monitor and grow your online business
            </Paragraph>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-blue-500 text-4xl mb-4">
                <AreaChartOutlined />
              </div>
              <Title level={4}>Revenue Analysis</Title>
              <Paragraph className="text-gray-500">
                Track sales performance with interactive charts and filters.
                Analyze trends over time and by product categories.
              </Paragraph>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-green-500 text-4xl mb-4">
                <ShoppingOutlined />
              </div>
              <Title level={4}>Inventory Management</Title>
              <Paragraph className="text-gray-500">
                Monitor stock levels, get low inventory alerts, and forecast
                when restocking is necessary.
              </Paragraph>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-purple-500 text-4xl mb-4">
                <DashboardOutlined />
              </div>
              <Title level={4}>Product Registration</Title>
              <Paragraph className="text-gray-500">
                Easily add new products to your inventory with a simple form.
                Upload images and track across your dashboard.
              </Paragraph>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <Title level={2}>Ready to Optimize Your E-Commerce Business?</Title>
          <Paragraph className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of e-commerce managers who use our dashboard to make
            data-driven decisions and grow their business.
          </Paragraph>
          <Link href="/register">
            <Button type="primary" size="large" icon={<RocketOutlined />} className="bg-blue-600 hover:bg-blue-700">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2">EcomDash</div>
              <p className="text-gray-400">© 2023 EcomDash. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/login" className="text-gray-400 hover:text-white">Login</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
