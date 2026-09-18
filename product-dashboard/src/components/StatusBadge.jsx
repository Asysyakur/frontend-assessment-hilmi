function StatusBadge({ status }) {
  const isInStock = status === "In Stock";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isInStock
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
          : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isInStock ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}

export default StatusBadge;