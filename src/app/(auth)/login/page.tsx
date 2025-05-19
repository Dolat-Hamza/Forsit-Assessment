'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        message.success('Login successful!');
        router.push('/dashboard');
      } else {
        message.error('Invalid credentials');
      }
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card className="w-full shadow-lg border-t-4 border-t-primary">
          <div className="text-center mb-6">
            <Title level={2} className="text-primary">Welcome Back</Title>
            <Text className="text-gray-500">Sign in to your account</Text>
          </div>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Email (admin@example.com)" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="Password (password123)" 
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="w-full bg-primary hover:bg-primary-dark" 
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          
          <Divider plain>Or</Divider>
          
          <div className="text-center mt-4">
            <Text className="text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
                Sign up
              </Link>
            </Text>
            <div className="mt-2">
              <Text className="text-gray-400 text-sm">
                Use admin@example.com / password123 to login
              </Text>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
