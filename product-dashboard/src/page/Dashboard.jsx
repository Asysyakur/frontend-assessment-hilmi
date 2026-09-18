import { useState, useEffect } from "react";
import { formatPrice, formatDate } from "../utils/formatters.js";
import StatusBadge from "../components/StatusBadge.jsx";
import CategoryBadge from "../components/CategoryBadge.jsx";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Asysyakur/frontend-assessment-hilmi/products",
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
            <h2 className="text-lg font-semibold text-slate-900">
              Product List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A list of all available products.
            </p>
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
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {index + 1}
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
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
