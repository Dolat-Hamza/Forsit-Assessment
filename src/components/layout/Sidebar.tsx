'use client';

import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {DashboardOutlined, LineChartOutlined, PlusCircleOutlined, ShoppingOutlined} from '@ant-design/icons';

const {Sider} = Layout;

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        {
            key: '/dashboard',
            icon: <DashboardOutlined/>,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: '/dashboard/revenue',
            icon: <LineChartOutlined/>,
            label: <Link href="/dashboard/revenue">Revenue Analysis</Link>,
        },
        {
            key: '/dashboard/inventory',
            icon: <ShoppingOutlined/>,
            label: <Link href="/dashboard/inventory">Inventory</Link>,
        },
        {
            key: '/dashboard/products/new',
            icon: <PlusCircleOutlined/>,
            label: <Link href="/dashboard/products/new">Add Product</Link>,
        },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="bg-white shadow-sm"
            theme="light"
            width={250}
        >
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
                <Link href="/dashboard" className="text-primary font-bold text-xl">
                    {collapsed ? 'ED' : 'EcomDash'}
                </Link>
            </div>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[pathname]}
                items={menuItems}
                className="border-r-0"
            />
        </Sider>
    );
}
