// Single place for money display: Indian Rupees (en-IN grouping).
export const formatINR = (n) =>
  Number(n ?? 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
