export const formatDate = (dateString) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(new Date(dateString));
};

export const formatPrice = (price) => {
  const priceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return priceFormatter.format(price);
};