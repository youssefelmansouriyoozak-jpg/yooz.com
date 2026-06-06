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
  const lower = colorName.toLowerCase().trim();

  // ── Noir et variantes ──
  if (lower === 'noir-blanc')                                   return '#1a1a1a'; // dégradé noir/blanc → noir dominant
  if (lower.includes('noir brillant'))                          return '#0a0a0a'; // noir brillant / laqué
  if (lower.includes('noir') || lower.includes('black') || lower.includes('أسود')) return '#000000';

  // ── Blanc ──
  if (lower.includes('blanc') || lower.includes('white') || lower.includes('أبيض')) return '#F8F8F8';

  // ── Beige / Sable / Saumon / Camel ──
  if (lower.includes('sable'))                                  return '#C2B280';
  if (lower.includes('saumon'))                                 return '#FA8072';
  if (lower.includes('camel'))                                  return '#C19A6B';
  if (lower.includes('beige') || lower.includes('بيج'))         return '#E8D5B0';

  // ── Marron / Tabac / Huile ──
  if (lower.includes('tabac'))                                  return '#8B5E3C';
  if (lower.includes('huile'))                                  return '#556B2F';
  if (lower.includes('marron') || lower.includes('brown') || lower.includes('بني')) return '#7B3F00';

  // ── Bleu et variantes ──
  if (lower.includes('bleu marine') || lower.includes('navy')) return '#001F5B';
  if (lower.includes('bleu ciel') || lower.includes('sky blue') || lower.includes('أزرق فاتح')) return '#87CEEB';
  if (lower.includes('bleu') || lower.includes('blue') || lower.includes('أزرق')) return '#1A56DB';

  // ── Vert et variantes ──
  if (lower.includes('vert pastel'))                            return '#A8D8A8';
  if (lower.includes('vert') || lower.includes('green') || lower.includes('أخضر')) return '#2E7D32';

  // ── Rouge / Grenat ──
  if (lower.includes('grenat'))                                 return '#6E1423';
  if (lower.includes('rouge') || lower.includes('red') || lower.includes('أحمر')) return '#D32F2F';

  // ── Rose / Violet ──
  if (lower.includes('violet') || lower.includes('purple') || lower.includes('بنفسجي')) return '#7B1FA2';
  if (lower.includes('rose') || lower.includes('pink') || lower.includes('وردي')) return '#E91E8C';

  // ── Gris / Argenté ──
  if (lower.includes('argenté') || lower.includes('argente') || lower.includes('silver')) return '#C0C0C0';
  if (lower.includes('gris') || lower.includes('gray') || lower.includes('رمادي')) return '#757575';

  // ── Doré / Cuivre ──
  if (lower.includes('cuivre') || lower.includes('copper'))    return '#B87333';
  if (lower.includes('doré') || lower.includes('dore') || lower.includes('gold')) return '#D4AF37';

  // ── Jaune ──
  if (lower.includes('jaune') || lower.includes('yellow') || lower.includes('أصفر')) return '#FBC02D';

  // ── Jeans ──
  if (lower.includes('jeans') || lower.includes('جينز'))       return '#5D76CB';

  // ── Couleur inconnue → gris neutre visible ──
  return '#AAAAAA';
};
