import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number | string) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return "0 MAD";
  
  // Use a stable decimal format and manually append currency to avoid Intl symbol mismatches
  const formatted = new Intl.NumberFormat('fr-MA', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
  
  // Replace non-breaking space with normal space to prevent hydration mismatch
  return `${formatted.replace(/\u00A0/g, ' ')} MAD`;
}

export const getColorHex = (colorName: string) => {
  const lower = colorName.toLowerCase();
  if (lower.includes('noir') || lower.includes('black') || lower.includes('أسود')) return '#000000';
  if (lower.includes('blanc') || lower.includes('white') || lower.includes('أبيض')) return '#FFFFFF';
  if (lower.includes('bleu ciel') || lower.includes('sky blue') || lower.includes('أزرق فاتح')) return '#87CEEB';
  if (lower.includes('bleu') || lower.includes('blue') || lower.includes('أزرق')) return '#0000FF';
  if (lower.includes('rouge') || lower.includes('red') || lower.includes('أحمر')) return '#FF0000';
  if (lower.includes('vert') || lower.includes('green') || lower.includes('أخضر')) return '#008000';
  if (lower.includes('jaune') || lower.includes('yellow') || lower.includes('أصفر')) return '#FFFF00';
  if (lower.includes('rose') || lower.includes('pink') || lower.includes('وردي')) return '#FFC0CB';
  if (lower.includes('gris') || lower.includes('gray') || lower.includes('رمادي')) return '#808080';
  if (lower.includes('marron') || lower.includes('brown') || lower.includes('بني')) return '#A52A2A';
  if (lower.includes('beige') || lower.includes('بيج')) return '#F5F5DC';
  if (lower.includes('jeans') || lower.includes('جينز')) return '#5d76cb';
  return '#CCCCCC';
};
