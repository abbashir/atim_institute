/**
 * Format currency to 1,234.56 style
 */
export const formatAmount = (amount) => {
  let formatedAmount = parseFloat(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatedAmount + ' TK';
};

/**
 * Format with Currency Symbol (BDT)
 */

export const formatNumber = (amount) => {
  return parseFloat(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
};