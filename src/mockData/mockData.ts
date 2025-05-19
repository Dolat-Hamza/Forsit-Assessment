import { Product, Order, RevenueData, CategorySales, MarketplaceSales } from '../types';

const randomNumber = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (daysBack = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - randomNumber(0, daysBack));
  return date.toISOString();
};

export const categories = [
  'Electronics', 
  'Clothing', 
  'Home & Kitchen', 
  'Beauty', 
  'Sports', 
  'Books', 
  'Toys'
];

export const generateProducts = (count = 50): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const category = categories[randomNumber(0, categories.length - 1)];
    const marketplace = ['Amazon', 'Walmart', 'Both'][randomNumber(0, 2)] as 'Amazon' | 'Walmart' | 'Both';
    const price = randomNumber(10, 200);
    const stockLevel = randomNumber(0, 100);
    
    return {
      id: `prod-${index + 1}`,
      name: `${category} Product ${index + 1}`,
      description: `This is a description for ${category} Product ${index + 1}`,
      price,
      category,
      stockLevel,
      image: `https://picsum.photos/seed/${index + 100}/200/200`,
      createdAt: randomDate(90),
      updatedAt: randomDate(30),
      marketplace,
      lowStockThreshold: 15
    };
  });
};

export const generateOrders = (products: Product[], count = 200): Order[] => {
  return Array.from({ length: count }, (_, index) => {
    const randomProduct = products[randomNumber(0, products.length - 1)];
    const quantity = randomNumber(1, 5);
    const marketplace = randomProduct.marketplace === 'Both' 
      ? ['Amazon', 'Walmart'][randomNumber(0, 1)] as 'Amazon' | 'Walmart'
      : randomProduct.marketplace as 'Amazon' | 'Walmart';
    
    return {
      id: `order-${index + 1}`,
      productId: randomProduct.id,
      productName: randomProduct.name,
      quantity,
      price: randomProduct.price,
      total: randomProduct.price * quantity,
      date: randomDate(30),
      status: ['completed', 'pending', 'cancelled'][randomNumber(0, 2)] as 'completed' | 'pending' | 'cancelled',
      marketplace
    };
  });
};

export const generateDailyRevenueData = (orders: Order[]): RevenueData[] => {
  const days = 30;
  const result: RevenueData[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayOrders = orders.filter(order => 
      order.date.split('T')[0] === dateStr && order.status === 'completed'
    );
    
    const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
    
    result.push({
      date: dateStr,
      revenue: dayRevenue,
      orders: dayOrders.length
    });
  }
  
  return result.reverse();
};

export const generateWeeklyRevenueData = (dailyData: RevenueData[]): RevenueData[] => {
  const result: RevenueData[] = [];
  const weeks = 4;
  
  for (let i = 0; i < weeks; i++) {
    const weekData = dailyData.slice(i * 7, (i + 1) * 7);
    const weekRevenue = weekData.reduce((sum, day) => sum + day.revenue, 0);
    const weekOrders = weekData.reduce((sum, day) => sum + day.orders, 0);
    
    result.push({
      date: `Week ${weeks - i}`,
      revenue: weekRevenue,
      orders: weekOrders
    });
  }
  
  return result.reverse();
};

export const generateMonthlyRevenueData = (): RevenueData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map(month => ({
    date: month,
    revenue: randomNumber(5000, 50000),
    orders: randomNumber(50, 500)
  }));
};

export const generateAnnualRevenueData = (): RevenueData[] => {
  const currentYear = new Date().getFullYear();
  
  return Array.from({ length: 5 }, (_, index) => {
    const year = currentYear - 4 + index;
    return {
      date: year.toString(),
      revenue: randomNumber(100000, 1000000),
      orders: randomNumber(1000, 10000)
    };
  });
};

export const generateCategorySales = (orders: Order[], products: Product[]): CategorySales[] => {
  const categorySales: Record<string, { revenue: number; orders: number }> = {};
  
  categories.forEach(category => {
    categorySales[category] = { revenue: 0, orders: 0 };
  });
  
  orders.forEach(order => {
    if (order.status === 'completed') {
      const product = products.find(p => p.id === order.productId);
      if (product) {
        categorySales[product.category].revenue += order.total;
        categorySales[product.category].orders += 1;
      }
    }
  });
  
  return Object.entries(categorySales).map(([category, data]) => ({
    category,
    revenue: data.revenue,
    orders: data.orders
  }));
};

export const generateMarketplaceSales = (orders: Order[]): MarketplaceSales[] => {
  const marketplaces = ['Amazon', 'Walmart'] as const;
  const result: MarketplaceSales[] = [];
  
  marketplaces.forEach(marketplace => {
    const marketplaceOrders = orders.filter(
      order => order.marketplace === marketplace && order.status === 'completed'
    );
    const revenue = marketplaceOrders.reduce((sum, order) => sum + order.total, 0);
    
    result.push({
      marketplace,
      revenue,
      orders: marketplaceOrders.length
    });
  });
  
  return result;
};

export const getRevenueByCategory = (
  orders: Order[], 
  products: Product[], 
  category: string
): RevenueData[] => {
  const days = 30;
  const result: RevenueData[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayOrders = orders.filter(order => {
      const product = products.find(p => p.id === order.productId);
      return (
        order.date.split('T')[0] === dateStr && 
        order.status === 'completed' && 
        product?.category === category
      );
    });
    
    const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
    
    result.push({
      date: dateStr,
      revenue: dayRevenue,
      orders: dayOrders.length,
      category
    });
  }
  
  return result.reverse();
};

export const products = generateProducts();
export const orders = generateOrders(products);
export const dailyRevenueData = generateDailyRevenueData(orders);
export const weeklyRevenueData = generateWeeklyRevenueData(dailyRevenueData);
export const monthlyRevenueData = generateMonthlyRevenueData();
export const annualRevenueData = generateAnnualRevenueData();
export const categorySales = generateCategorySales(orders, products);
export const marketplaceSales = generateMarketplaceSales(orders);

export const mockApiData = {
  products,
  orders,
  dailyRevenueData,
  weeklyRevenueData,
  monthlyRevenueData,
  annualRevenueData,
  categorySales,
  marketplaceSales
};
