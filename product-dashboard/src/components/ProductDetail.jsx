import { formatDate, formatPrice } from "../utils/formatters";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";

function ProductDetail({ product, onEdit, onDelete }) {
  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Product Name
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Product ID: #{product.id}
        </p>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-slate-500">Category</p>
          <CategoryBadge category={product.category} />
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-500">Status</p>
          <StatusBadge status={product.status} />
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-500">Price</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatPrice(product.price)}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm text-slate-500">Created At</p>
          <p className="text-sm font-medium text-slate-900">
            {formatDate(product.createdAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;