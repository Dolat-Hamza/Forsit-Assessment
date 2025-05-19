'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { AuthProvider } from '../../contexts/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ConfigProvider>
  );
}
