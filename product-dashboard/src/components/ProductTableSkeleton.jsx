function ProductTableSkeleton() {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <tbody className="divide-y divide-slate-100">
      {skeletonRows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          {/* Number */}
          <td className="whitespace-nowrap px-6 py-5">
            <div className="h-4 w-6 rounded bg-slate-200" />
          </td>

          {/* Product name */}
          <td className="px-6 py-5">
            <div className="h-4 w-36 rounded bg-slate-200" />
          </td>

          {/* Category */}
          <td className="px-6 py-5">
            <div className="h-6 w-24 rounded-full bg-slate-200" />
          </td>

          {/* Price */}
          <td className="px-6 py-5">
            <div className="h-4 w-24 rounded bg-slate-200" />
          </td>

          {/* Status */}
          <td className="px-6 py-5">
            <div className="h-6 w-20 rounded-full bg-slate-200" />
          </td>

          {/* Created date */}
          <td className="px-6 py-5">
            <div className="h-4 w-28 rounded bg-slate-200" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default ProductTableSkeleton;