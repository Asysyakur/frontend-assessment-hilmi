import { useEffect, useState } from "react";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  validateProductForm,
} from "../utils/productValidation";

const EMPTY_FORM = {
  id: null,
  name: "",
  category: "",
  price: "",
  status: "In Stock",
  createdAt: new Date().toISOString(),
};

function ProductForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Prefill form when editing a product
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id ?? null,
        name: initialData.name ?? "",
        category: initialData.category ?? "",
        price: initialData.price ?? "",
        status: initialData.status ?? "In Stock",
        createdAt: initialData.createdAt ?? new Date().toISOString(),
      });
    } else {
      setFormData(EMPTY_FORM);
    }

    setErrors({});
    setTouched({});
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const nextFormData = {
      ...formData,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    };

    setFormData(nextFormData);

    // Validate dynamically after field has been touched
    if (touched[name]) {
      const nextErrors = validateProductForm(nextFormData);

      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: nextErrors[name] || "",
      }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true,
    }));

    const nextErrors = validateProductForm(formData);

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: nextErrors[name] || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateProductForm(formData);

    setErrors(validationErrors);

    setTouched({
      name: true,
      category: true,
      price: true,
      status: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      status: formData.status,
      createdAt: isEditMode ? formData.createdAt : new Date().toISOString(),
    };

    if (isEditMode) {
      onSubmit({
        ...payload,
        id: formData.id,
      });
    } else {
      onSubmit(payload);
    }
  };

  const isFormInvalid = Object.keys(validateProductForm(formData)).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <FormField label="Product Name" error={errors.name}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter product name"
          className={getInputClassName(errors.name)}
        />
      </FormField>

      {/* Category */}
      <FormField label="Category" error={errors.category}>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName(errors.category)}
        >
          <option value="">Select category</option>

          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </FormField>

      {/* Price */}
      <FormField label="Price (IDR)" error={errors.price}>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          onBlur={handleBlur}
          min="0"
          step="1"
          placeholder="Enter price"
          className={getInputClassName(errors.price)}
        />
      </FormField>

      {/* Status */}
      <FormField label="Status" error={errors.status}>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName(errors.status)}
        >
          {PRODUCT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </FormField>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isFormInvalid || isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : isEditMode
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      {children}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function getInputClassName(error) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
  }`;
}

export default ProductForm;
