export const money = (n) => `$${Number(n).toFixed(2)}`;
export const moneyShort = (n) => (Number.isInteger(n) ? `$${n}` : `$${Number(n).toFixed(2)}`);
export const img = (name) => `/images/${name}.webp`;
export const video = (name) => `/videos/${name}.mp4`;
