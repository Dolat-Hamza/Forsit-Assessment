'use client';

import React, {useState} from 'react';
import type {UploadFile, UploadProps} from 'antd';
import {Button, Card, Divider, Form, Input, InputNumber, message, Select, Space, Typography, Upload} from 'antd';
import {ClearOutlined, SaveOutlined, UploadOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
import {categories} from '@/mockData/mockData';
import Image from "next/image";

const {Title, Text} = Typography;
const {TextArea} = Input;

export default function AddProductPage() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (values: Record<string, unknown>) => {
        setSubmitting(true);

        setTimeout(() => {
            console.log('Form values:', values);
            console.log('Image:', fileList);

            message.success('Product added successfully!');
            form.resetFields();
            setFileList([]);
            setPreviewImage(null);
            setSubmitting(false);
        }, 1500);
    };

    const onReset = () => {
        form.resetFields();
        setFileList([]);
        setPreviewImage(null);
    };

    const handleUploadChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);

        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(newFileList[0].originFileObj);
        } else {
            setPreviewImage(null);
        }
    };

    const uploadButton = (
        <div>
            <UploadOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <div>
            <Title level={2}>Add New Product</Title>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            marketplace: 'Both',
                            stockLevel: 0,
                            lowStockThreshold: 15
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Title level={4}>Product Information</Title>
                                <Divider/>

                                <Form.Item
                                    name="name"
                                    label="Product Name"
                                    rules={[{required: true, message: 'Please enter product name'}]}
                                >
                                    <Input placeholder="Enter product name"/>
                                </Form.Item>

                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[{required: true, message: 'Please enter product description'}]}
                                >
                                    <TextArea
                                        placeholder="Enter product description"
                                        rows={4}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[{required: true, message: 'Please select a category'}]}
                                >
                                    <Select placeholder="Select category">
                                        {categories.map(category => (
                                            <Select.Option key={category} value={category}>
                                                {category}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="marketplace"
                                    label="Marketplace"
                                    rules={[{required: true, message: 'Please select marketplace'}]}
                                >
                                    <Select placeholder="Select marketplace">
                                        <Select.Option value="Amazon">Amazon</Select.Option>
                                        <Select.Option value="Walmart">Walmart</Select.Option>
                                        <Select.Option value="Both">Both</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div>
                                <Title level={4}>Pricing and Inventory</Title>
                                <Divider/>

                                <Form.Item
                                    name="price"
                                    label="Price ($)"
                                    rules={[{required: true, message: 'Please enter product price'}]}
                                >
                                    <InputNumber
                                        min={0}
                                        step={0.01}
                                        precision={2}
                                        className="w-full"
                                        placeholder="0.00"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="stockLevel"
                                    label="Initial Stock Level"
                                    rules={[{required: true, message: 'Please enter initial stock level'}]}
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

                                <Form.Item
                                    name="image"
                                    label="Product Image"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleUploadChange}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>

                                    {previewImage && (
                                        <div className="mt-4">
                                            <Text type="secondary">Preview:</Text>
                                            <div className="mt-2">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="max-w-full h-auto max-h-40 rounded"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <Divider/>

                        <div className="flex justify-end">
                            <Space>
                                <Button
                                    icon={<ClearOutlined/>}
                                    onClick={onReset}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined/>}
                                    htmlType="submit"
                                    loading={submitting}
                                >
                                    Add Product
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Card>
            </motion.div>
        </div>
    );
}
