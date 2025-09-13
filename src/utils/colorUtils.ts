export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '');
  const match = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  if (!/^([0-9a-fA-F]{6})$/.test(match)) return null;
  const intVal = parseInt(match, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function contrastRatio(hex1: string, hex2: string): number | null {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  if (!a || !b) return null;
  const L1 = luminance(a.r, a.g, a.b) + 0.05;
  const L2 = luminance(b.r, b.g, b.b) + 0.05;
  const ratio = L1 > L2 ? L1 / L2 : L2 / L1;
  return Math.round(ratio * 100) / 100;
}

export function lighten(hex: string, amount = 0.1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, Math.round(rgb.r + 255 * amount));
  const g = Math.min(255, Math.round(rgb.g + 255 * amount));
  const b = Math.min(255, Math.round(rgb.b + 255 * amount));
  return rgbToHex(r, g, b);
}

export function darken(hex: string, amount = 0.1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.max(0, Math.round(rgb.r - 255 * amount));
  const g = Math.max(0, Math.round(rgb.g - 255 * amount));
  const b = Math.max(0, Math.round(rgb.b - 255 * amount));
  return rgbToHex(r, g, b);
}



