function CategoryBadge({ category }) {
  const categoryStyles = {
    Electronics: "bg-blue-50 text-blue-700 ring-blue-600/20",
    "Home & Kitchen": "bg-purple-50 text-purple-700 ring-purple-600/20",
    Apparel: "bg-orange-50 text-orange-700 ring-orange-600/20",
  };

  const badgeStyle =
    categoryStyles[category] || "bg-slate-50 text-slate-700 ring-slate-600/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeStyle}`}
    >
      {category}
    </span>
  );
}

export default CategoryBadge;
