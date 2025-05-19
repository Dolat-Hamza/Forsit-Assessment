# E-Commerce Admin Dashboard

A comprehensive web-based admin dashboard for e-commerce managers that centralizes crucial data points such as sales, revenue, and inventory status. The dashboard includes a Revenue Analysis Page, an Inventory Management Page, and a Product Registration feature with sample data for products sold on Amazon & Walmart.

## Features

### Revenue Analysis Page
- Real-time display of total orders and sales (revenue)
- Interactive charts to visualize orders, sales, and inventory trends over time (daily, weekly, monthly, annually)
- Revenue data filterable by product categories
- Interactive charts displaying revenue trends and comparisons

### Inventory Management Page
- List view of all products with current inventory status
- Options to sort, filter, and search products
- Functionality to update inventory levels
- Low inventory alerts and forecasting to indicate when restocking is necessary

### Product Registration
- Form to add new products to the inventory, with fields for product name, description, price, and initial stock level
- Option to upload product images
- Successful submission updates the inventory and is reflected across the dashboard

### Authentication
- Basic email/password authentication
- Protected routes for dashboard pages
- User session management

## Tech Stack

- **Frontend Framework**: Next.js with TypeScript
- **UI Components**: Ant Design
- **Animations**: Framer Motion
- **Icons**: React Icons and Ant Design Icons
- **Charts**: Highcharts
- **Styling**: Tailwind CSS
- **API Integration**: Ready for mockapi.io

## Folder Structure

```
ecommerce-admin-dashboard/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication routes
│   │   │   └── login/       # Login page
│   │   ├── (dashboard)/     # Dashboard routes
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   │   ├── revenue/ # Revenue analysis
│   │   │   │   ├── inventory/ # Inventory management
│   │   │   │   └── products/new/ # Product registration
│   │   │   └── layout.tsx   # Dashboard layout
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable components
│   │   ├── auth/            # Authentication components
│   │   ├── layout/          # Layout components
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── mockData/            # Mock data for development
│   │   └── mockData.ts      # Generated mock data
│   └── types/               # TypeScript type definitions
│       └── index.ts         # Type definitions
├── .eslintrc.json           # ESLint configuration
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Authentication

For demo purposes, use the following credentials:
- Email: admin@example.com
- Password: password123

## API Integration

The dashboard is designed to work with mockapi.io. The mock data structure is available in `src/mockData/mockData.ts` and can be used to set up your mockapi.io endpoints.

### API Endpoints Structure

- `/products` - Product data
- `/orders` - Order data
- `/revenue/daily` - Daily revenue data
- `/revenue/weekly` - Weekly revenue data
- `/revenue/monthly` - Monthly revenue data
- `/revenue/annual` - Annual revenue data
- `/categories` - Category sales data
- `/marketplaces` - Marketplace sales data

## Customization

### Theming

The dashboard uses Ant Design's theming system. You can customize the theme by modifying the ConfigProvider in `src/app/(dashboard)/layout.tsx`.

### Adding New Features

The modular structure makes it easy to add new features:

1. Create new components in the appropriate directory
2. Add new routes in the app directory
3. Update the sidebar navigation in `src/components/layout/Sidebar.tsx`

## License

This project is licensed under the MIT License.
