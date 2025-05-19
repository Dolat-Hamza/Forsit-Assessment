'use client';

import React from 'react';
import { Layout, Button, Avatar, Dropdown, MenuProps, Space } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header } = Layout;

export default function AppHeader() {
  const { user, logout } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="px-4 py-2">
          <p className="font-bold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      ),
    },
    {
      key: '2',
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Header className="bg-white flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-primary">E-Commerce Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button type="text" icon={<BellOutlined className="text-gray-500" />} className="hover:bg-gray-100" />
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space className="cursor-pointer">
            <Avatar icon={<UserOutlined />} className="bg-primary" />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}
