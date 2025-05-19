export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stockLevel: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
    marketplace: 'Amazon' | 'Walmart' | 'Both';
    lowStockThreshold: number;
};

export type Order = {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    date: string;
    status: 'completed' | 'pending' | 'cancelled';
    marketplace: 'Amazon' | 'Walmart';
};

export type RevenueData = {
    date: string;
    revenue: number;
    orders: number;
    marketplace?: 'Amazon' | 'Walmart';
    category?: string;
};

export type CategorySales = {
    category: string;
    revenue: number;
    orders: number;
};

export type MarketplaceSales = {
    marketplace: 'Amazon' | 'Walmart';
    revenue: number;
    orders: number;
};

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'annually';
