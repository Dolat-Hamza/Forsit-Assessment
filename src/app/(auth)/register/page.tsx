'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await register(values.name, values.email, values.password);
      
      if (success) {
        message.success('Registration successful!');
        router.push('/dashboard');
      } else {
        message.error('Registration failed. Please try again.');
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
            <Title level={2} className="text-primary">Create Account</Title>
            <Text className="text-gray-500">Join our e-commerce dashboard platform</Text>
          </div>
          
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Full Name" 
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />} 
                placeholder="Email" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="Password" 
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="Confirm Password" 
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="w-full bg-primary hover:bg-primary-dark" 
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
          
          <Divider plain>Or</Divider>
          
          <div className="text-center mt-4">
            <Text className="text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
                Sign in
              </Link>
            </Text>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
