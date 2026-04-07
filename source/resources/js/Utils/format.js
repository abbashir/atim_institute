import {format} from "date-fns";

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


/**
 * Converts "23T00:00:00.000000Z-11-1970" → "23-11-1970"
 */
export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return '';

  try {
    // Rearrange to a parseable format: "1970-11-23T00:00:00.000000Z"
    const normalized = dateStr.replace(/^(\d+)(T[\d:.Z]+)-(\d+)-(\d+)$/, '$4-$3-$1$2');
    const date = new Date(normalized);
    return format(date, 'dd-MM-yyyy');
  } catch {
    return '';
  }
};