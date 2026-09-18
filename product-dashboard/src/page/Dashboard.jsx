import { useState, useEffect } from "react";
import { formatPrice, formatDate } from "../utils/formatters.js";
import StatusBadge from "../components/StatusBadge.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductDetail from "../components/ProductDetail.jsx";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [openProductForm, setOpenProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductDetail, setOpenProductDetail] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products",
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;

    return matchesSearchTerm && matchesCategory && matchesStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // CRUD Functions (Create, Read, Update, Delete) can be implemented here.
  const handleCreateProduct = async (newProduct) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status}`);
      }

      const createdProduct = await response.json();

      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products/${updatedProduct.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }

      const updatedProductFromServer = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProductFromServer.id
            ? updatedProductFromServer
            : product,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products/${productId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Product Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your products and inventory.
          </p>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Product List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A list of all available products.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setOpenProductForm(true);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-4 grid-cols-1 w-full">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="search"
                  className="text-sm font-medium text-slate-700"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  placeholder="Search products..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 bg-slate-50 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="filter"
                  className="text-sm font-medium text-slate-700"
                >
                  Filter by Category
                </label>
                <select
                  id="filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-md border border-slate-300 bg-slate-50 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Apparel">Apparel</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-slate-700"
                >
                  Filter by Status
                </label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border border-slate-300 bg-slate-50 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    No
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-slate-50"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenProductDetail(true);
                    }}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {product.name}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      <CategoryBadge category={product.category} />
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {formatPrice(product.price)}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {formatDate(product.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(
                  startIndex + productsPerPage,
                  filteredProducts.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage <= 1}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={
                  currentPage >= totalPages || filteredProducts.length === 0
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {openProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {selectedProduct ? "Edit Product" : "Add Product"}
              </h2>

              <button
                type="button"
                onClick={() => setOpenProductForm(false)}
                className="text-xl text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <ProductForm
              initialData={selectedProduct}
              onSubmit={async (formData) => {
                try {
                  if (selectedProduct) {
                    await handleUpdateProduct(formData);
                  } else {
                    await handleCreateProduct(formData);
                  }

                  setOpenProductForm(false);
                  setSelectedProduct(null);
                } catch (error) {
                  // Modal tetap terbuka jika request gagal
                  console.error(error);
                }
              }}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
      {/* Product Detail Modal */}
      {openProductDetail && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Product Details
              </h2>
              <button
                type="button"
                onClick={() => {
                  setOpenProductDetail(false);
                  setSelectedProduct(null);
                }}
                className="text-xl text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>
            <ProductDetail
              product={selectedProduct}
              onEdit={() => {
                setOpenProductDetail(false);
                setOpenProductForm(true);
              }}
              onDelete={async () => {
                const confirmed = window.confirm(
                  `Are you sure you want to delete "${selectedProduct.name}"?`,
                );

                if (!confirmed) return;

                await handleDeleteProduct(selectedProduct.id);

                setOpenProductDetail(false);
                setSelectedProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
