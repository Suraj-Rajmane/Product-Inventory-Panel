# Product Inventory Panel

A simple product inventory management panel built with React and TypeScript.  
The application allows users to view products and add new products using a validated form.

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Steps to run locally

```bash
# Clone the repository
git clone https://github.com/Suraj-Rajmane/Product-Inventory-Panel.git

# Navigate to the project directory
cd product-inventory-panel

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Overview of Approach

- Built the application using React and TypeScript, with a strong focus on clean structure, maintainability, and type safety.

- Used React Router to handle navigation between the product listing and product creation pages.

- Used React Query (TanStack Query) to manage asynchronous operations and mutations, keeping data-fetching logic predictable and scalable.

- Leveraged shadcn/ui components for form controls and UI elements, ensuring consistency, accessibility, and a clean design system.

- Styled the UI using Tailwind CSS, keeping the layout minimal, readable, and responsive.

- Kept components modular and avoided unnecessary abstractions to maintain clarity and ease of understanding.

- Implemented the product creation form using React Hook Form for efficient, performant form state management.

- Added schema-based validation with Zod, integrated via @hookform/resolvers, to ensure consistent runtime and compile-time validation.

### Time Taken: ~7 hours

- Project setup & routing (Set up React+Typescript project, Tailwind CSS, shadcn/ui, React-Router and React-Query): ~1 hour

- Fetching products data, search, filter and sort functionality: ~2 hours

- Form handling & validation: ~2 hours

- UI polish & spacing: ~1 hour

- Debugging, cleanup and refactoring code: ~1 hour

### Known limitations or TODOs

- Did not implement Zustand for managing product form or filter state

- Did not implement in-place edit for product stock

- Did not persist new product / product edit in localStorage
