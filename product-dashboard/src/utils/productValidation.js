export const PRODUCT_CATEGORIES = ["Electronics", "Home & Kitchen", "Apparel"];

export const PRODUCT_STATUSES = ["In Stock", "Out of Stock"];

export function validateProductForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!formData.category) {
    errors.category = "Please select a category.";
  } else if (!PRODUCT_CATEGORIES.includes(formData.category)) {
    errors.category = "Please select a valid category.";
  }

  if (formData.price === "") {
    errors.price = "Price is required.";
  } else if (
    typeof formData.price !== "number" ||
    !Number.isFinite(formData.price)
  ) {
    errors.price = "Price must be a valid number.";
  } else if (formData.price <= 0) {
    errors.price = "Price must be greater than 0.";
  }

  if (!PRODUCT_STATUSES.includes(formData.status)) {
    errors.status = "Please select a valid status.";
  }

  return errors;
}
