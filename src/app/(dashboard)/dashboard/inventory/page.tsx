'use client';

import React, {useEffect, useState} from 'react';
import type {TableProps} from 'antd';
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Progress,
    Select,
    Space,
    Spin,
    Table,
    Tag,
    Tooltip,
    Typography
} from 'antd';
import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
import {products as mockProducts} from '../../../../mockData/mockData';
import type {Product} from '@/types';
import Image from "next/image";

const {Title} = Typography;

export default function InventoryPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [marketplaceFilter, setMarketplaceFilter] = useState<string | null>(null);
    const [stockFilter, setStockFilter] = useState<string | null>(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleCategoryFilter = (value: string | null) => {
        setCategoryFilter(value);
    };

    const handleMarketplaceFilter = (value: string | null) => {
        setMarketplaceFilter(value);
    };

    const handleStockFilter = (value: string | null) => {
        setStockFilter(value);
    };

    const showUpdateModal = (product: Product) => {
        setCurrentProduct(product);
        form.setFieldsValue({
            stockLevel: product.stockLevel,
            lowStockThreshold: product.lowStockThreshold
        });
        setIsUpdateModalVisible(true);
    };

    const handleUpdateSubmit = () => {
        form.validateFields().then(values => {
            if (currentProduct) {
                const updatedProducts = products.map(product =>
                    product.id === currentProduct.id
                        ? {...product, ...values, updatedAt: new Date().toISOString()}
                        : product
                );

                setProducts(updatedProducts);
                setIsUpdateModalVisible(false);
                message.success('Inventory updated successfully');
            }
        });
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = searchText
            ? product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase())
            : true;

        const matchesCategory = categoryFilter
            ? product.category === categoryFilter
            : true;

        const matchesMarketplace = marketplaceFilter
            ? product.marketplace === marketplaceFilter || product.marketplace === 'Both'
            : true;

        const matchesStock = stockFilter
            ? (stockFilter === 'low' && product.stockLevel < product.lowStockThreshold) ||
            (stockFilter === 'out' && product.stockLevel === 0) ||
            (stockFilter === 'in' && product.stockLevel >= product.lowStockThreshold)
            : true;

        return matchesSearch && matchesCategory && matchesMarketplace && matchesStock;
    });

    const categories = Array.from(new Set(products.map(product => product.category)));

    const columns: TableProps<Product>['columns'] = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center">
                    {/*{record.image && (*/}
                    {/*  <img */}
                    {/*    src={record.image} */}
                    {/*    alt={text} */}
                    {/*    className="w-10 h-10 object-cover rounded mr-3"*/}
                    {/*  />*/}
                    {/*)}*/}
                    <div>
                        <div className="font-medium">{text}</div>
                        <div className="text-xs text-gray-500">{record.id}</div>
                    </div>
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag>{text}</Tag>,
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Marketplace',
            dataIndex: 'marketplace',
            key: 'marketplace',
            render: (text) => {
                let color = 'blue';
                if (text === 'Amazon') color = 'orange';
                if (text === 'Walmart') color = 'blue';
                if (text === 'Both') color = 'green';

                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Stock Level',
            dataIndex: 'stockLevel',
            key: 'stockLevel',
            render: (text, record) => {
                let color = 'success';

                if (text === 0) {
                    color = 'exception';
                } else if (text < record.lowStockThreshold) {
                    color = 'warning';
                }

                return (
                    <div>
                        <Progress
                            percent={Math.min(100, (text / (record.lowStockThreshold * 2)) * 100)}
                            size="small"
                            status={color as "success" | "exception" | "normal" | "active"}
                            className="mb-1"
                        />
                        <div className="flex items-center">
                            <span className="mr-2">{text} units</span>
                            {text === 0 && <Tag color="red">Out of Stock</Tag>}
                            {text > 0 && text < record.lowStockThreshold && <Tag color="orange">Low Stock</Tag>}
                        </div>
                    </div>
                );
            },
            sorter: (a, b) => a.stockLevel - b.stockLevel,
        },
        {
            title: 'Last Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => new Date(text).toLocaleDateString(),
            sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Update Inventory">
                        <Button
                            type="primary"
                            icon={<EditOutlined/>}
                            onClick={() => showUpdateModal(record)}
                        >
                            Update
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div>
            <Title level={2}>Inventory Management</Title>

            {/* Filters */}
            <Card className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        placeholder="Search products..."
                        prefix={<SearchOutlined/>}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="md:w-1/3"
                    />

                    <Select
                        placeholder="Filter by Category"
                        allowClear
                        onChange={handleCategoryFilter}
                        className="md:w-1/5"
                        options={categories.map(category => ({value: category, label: category}))}
                    />

                    <Select
                        placeholder="Filter by Marketplace"
                        allowClear
                        onChange={handleMarketplaceFilter}
                        className="md:w-1/5"
                        options={[
                            {value: 'Amazon', label: 'Amazon'},
                            {value: 'Walmart', label: 'Walmart'},
                            {value: 'Both', label: 'Both'}
                        ]}
                    />

                    <Select
                        placeholder="Filter by Stock"
                        allowClear
                        onChange={handleStockFilter}
                        className="md:w-1/5"
                        options={[
                            {value: 'low', label: 'Low Stock'},
                            {value: 'out', label: 'Out of Stock'},
                            {value: 'in', label: 'In Stock'}
                        ]}
                    />
                </div>
            </Card>

            {/* Products Table */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <Card>
                    <div className="mb-4 flex justify-between items-center">
            <span className="text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </span>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredProducts.map(product => ({...product, key: product.id}))}
                        pagination={{pageSize: 10}}
                    />
                </Card>
            </motion.div>

            {/* Update Inventory Modal */}
            <Modal
                title="Update Inventory"
                open={isUpdateModalVisible}
                onCancel={() => setIsUpdateModalVisible(false)}
                onOk={handleUpdateSubmit}
            >
                {currentProduct && (
                    <div className="mb-4">
                        <div className="flex items-center mb-4">
                            {currentProduct.image && (
                                <Image
                                    width={100}
                                    height={100}
                                    src={currentProduct.image}
                                    alt={currentProduct.name}
                                    className="w-12 h-12 object-cover rounded mr-3"
                                />
                            )}
                            <div>
                                <div className="font-medium">{currentProduct.name}</div>
                                <div className="text-xs text-gray-500">
                                    {currentProduct.category} | ${currentProduct.price.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="stockLevel"
                                label="Stock Level"
                                rules={[{required: true, message: 'Please enter stock level'}]}
                            >
                                <InputNumber min={0} className="w-full"/>
                            </Form.Item>

                            <Form.Item
                                name="lowStockThreshold"
                                label="Low Stock Threshold"
                                rules={[{required: true, message: 'Please enter low stock threshold'}]}
                            >
                                <InputNumber min={1} className="w-full"/>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </div>
    );
}
