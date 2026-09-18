
# Product Management Dashboard

A responsive product management dashboard built with React and Tailwind CSS. The application supports product listing, searching, filtering, pagination, and CRUD operations.

## Live Demo

https://product-dashboard-delta-one.vercel.app/

## API Endpoint

The application uses the following my-json-server endpoint:

```text
https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Fetch API
- my-json-server

## Features

- Display products in a responsive table
- Search products by name
- Filter products by category and status
- Pagination
- View product details
- Create a new product
- Edit an existing product
- Delete a product
- Loading skeleton during initial data fetching
- Error notification for failed network requests
- Optimistic UI updates with rollback

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Asysyakur/frontend-assessment-hilmi
```

2. Navigate to the project directory:

```bash
cd product-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL provided by Vite.

### Environment Variables

No environment variables are required.

The API endpoint is currently configured in the application source code.

## Architecture Overview

The application follows a component-based React architecture.

### Folder Structure

```text
src/
├── components/
│   ├── ProductForm.jsx
│   ├── ProductDetail.jsx
│   ├── ProductTableSkeleton.jsx
│   ├── CategoryBadge.jsx
│   └── StatusBadge.jsx
├── pages/
│   └── Dashboard.jsx
├── utils/
│   └── formatters.js
│   └── productValidation.js
├── main.jsx
└── index.css
```

> The folder structure above should be adjusted to match the actual project structure.

### Key Components

- **Dashboard:** Handles product fetching, filtering, pagination, and CRUD operations.
- **ProductForm:** Handles product creation and editing through a reusable form.
- **ProductDetail:** Displays product information and provides edit and delete actions.
- **ProductTableSkeleton:** Displays a loading state while the initial API request is in progress.
- **CategoryBadge:** Displays the product category.
- **StatusBadge:** Displays the product status.
- **formatters:** Contains reusable formatting functions, such as price and date formatting.
- **productValidation:** Contains product form validation rules, including required fields and valid input formats.

## State Management

React's built-in `useState` and `useEffect` are used for state management.

The product list is managed locally in the Dashboard component. This approach was chosen because the application has a relatively small scope and does not require a global state management library.

Filtering and pagination are derived from the local product state.

## Optimistic UI Updates

The application uses optimistic updates for create, edit, and delete operations.

The local UI is updated immediately before waiting for the server response. This provides a more responsive user experience and reduces the perceived impact of network latency.

After a successful request:

- The local state is reconciled with the server response for create and update operations.
- The deleted product remains removed from the local state.

If the request fails:

- The previous product state is restored.
- An error toast is displayed to inform the user.

### Trade-offs

my-json-server simulates writes in memory. Changes may persist only during the current session and are not written back to the GitHub repository. Data can also reset.

Optimistic updates improve perceived responsiveness, but the UI may temporarily display changes that are not successfully persisted on the server. Therefore, rollback handling is implemented to keep the local state consistent when a request fails.

Temporary IDs may be used to identify newly created items while a request is in progress. Once the server responds, the temporary item is reconciled with the server-provided data.

## Assumptions

- The API returns a valid product ID for successfully created products.
- Product IDs are used to identify products during edit and delete operations.
- The API response is treated as the source of truth after a successful request.
- The application uses client-side filtering and pagination.
- Network failures are handled through error notifications and state rollback.

## Decisions and Trade-offs

### Local State Management

React state was selected instead of an external state management library because the application's state requirements are relatively simple.

### Client-side Filtering

Filtering is performed on the fetched product list. This avoids additional API requests for every search or filter interaction.

### Optimistic Updates

Optimistic updates were implemented to improve responsiveness when performing CRUD operations. Rollback handling is used to recover from failed requests.

### Reusable Components

Common UI elements, such as badges, forms, and loading skeletons, are separated into reusable components to improve maintainability.

## Improvements With More Time

- Add automated tests for CRUD operations and form validation.
- Add a dedicated reusable toast notification component.
- Implement a retry action for failed network requests.
- Add stronger form validation and accessible error messages.
- Improve accessibility with keyboard navigation and ARIA attributes.
- Add server-side filtering and pagination if supported by the API.
- Add a confirmation dialog before deleting a product.
- Improve handling of API responses that do not contain a valid product ID.
- Add environment-based API configuration.
- Improve loading states for individual create, edit, and delete actions.

## License

This project was created as part of a frontend development assessment.