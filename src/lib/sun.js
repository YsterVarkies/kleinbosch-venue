// Sunset time for a place on the 15th of a month (NOAA's simplified solar equations),
// returned as "HH:MM" in South African Standard Time (UTC+2).
export function sunsetTime(lat, lng, month, year = new Date().getFullYear()) {
  const rad = Math.PI / 180;
  const dayOfYear = Math.round((Date.UTC(year, month, 15) - Date.UTC(year, 0, 0)) / 864e5);
  const g = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const phi = lat * rad;
  const hourAngle =
    Math.acos(Math.cos(90.833 * rad) / (Math.cos(phi) * Math.cos(decl)) - Math.tan(phi) * Math.tan(decl)) / rad;
  const minutes = Math.round(720 - 4 * (lng - hourAngle) - eqTime + 120);
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}
