export function getAqiColor(index: number): string {
    // Clamp 0–500
    const aqi = Math.max(0, Math.min(200, index));

    // Normalized 0..1
    const t = aqi / 200;

    // Multicolor gradient: green → yellow → red
    if (t < 0.5) {
        // green → yellow
        return interpolateColor('#4ade80', '#facc15', t / 0.5);
    } else {
        // yellow → red
        return interpolateColor('#facc15', '#ef4444', (t - 0.5) / 0.5);
    }
}

function interpolateColor(start: string, end: string, t: number): string {
    const s = hexToRgb(start);
    const e = hexToRgb(end);

    const r = Math.round(s.r + (e.r - s.r) * t);
    const g = Math.round(s.g + (e.g - s.g) * t);
    const b = Math.round(s.b + (e.b - s.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string) {
    const parsed = hex.replace('#', '');
    return {
        r: parseInt(parsed.substring(0, 2), 16),
        g: parseInt(parsed.substring(2, 4), 16),
        b: parseInt(parsed.substring(4, 6), 16)
    };
}

export function format(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    if (Number.isNaN(value)) return '-';
    return value.toString();
}
