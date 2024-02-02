export const daysLeft = (deadline) => {
  const deadlineInMilliseconds = deadline * 1000;
  const difference = new Date(deadlineInMilliseconds).getTime() - Date.now();
  if (difference <= 0) return "0";
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};