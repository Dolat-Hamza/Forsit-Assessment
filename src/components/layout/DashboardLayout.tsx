'use client';

import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import ProtectedRoute from '../auth/ProtectedRoute';

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Header />
          <Content className="p-6 bg-[#f0f2f5] overflow-auto">
            <div className="rounded-lg overflow-hidden bg-transparent">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
}
