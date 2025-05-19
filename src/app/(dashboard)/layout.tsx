'use client';

import React from 'react';
import {ConfigProvider} from 'antd';
import {AuthProvider} from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function RootDashboardLayout({
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
                <DashboardLayout>{children}</DashboardLayout>
            </AuthProvider>
        </ConfigProvider>
    );
}
