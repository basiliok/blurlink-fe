export const AVAILABLE_SUB_ICONS = [
    'none',
    'verde-menta',
    'coral',
    'ambar-miel',
    'lavanda',
    'azul-cielo',
    'verde-lima',
    'rosa-palo',
    'durazno',
    'indigo',
    'cian-agua',
] as const;

export type AvailableSubIcon = (typeof AVAILABLE_SUB_ICONS)[number];

export const isAvailableSubIcon = (value: string): value is AvailableSubIcon => {
    return (AVAILABLE_SUB_ICONS as readonly string[]).includes(value);
};

export const subIconColorClasses: Record<AvailableSubIcon, { bg: string; border: string }> = {
    none: { bg: '', border: '' },
    'verde-menta': { bg: 'bg-[#22C8B0]', border: 'border-[#1AA792]' },
    coral: { bg: 'bg-[#EF8B6E]', border: 'border-[#D27154]' },
    'ambar-miel': { bg: 'bg-[#E8B547]', border: 'border-[#C99632]' },
    lavanda: { bg: 'bg-[#A493E8]', border: 'border-[#8775CB]' },
    'azul-cielo': { bg: 'bg-[#5BB0E0]', border: 'border-[#3F94C5]' },
    'verde-lima': { bg: 'bg-[#A8CC5A]', border: 'border-[#8AAD3E]' },
    'rosa-palo': { bg: 'bg-[#E37FA8]', border: 'border-[#C5638A]' },
    durazno: { bg: 'bg-[#ED9A5D]', border: 'border-[#CF7E40]' },
    indigo: { bg: 'bg-[#7F8AE5]', border: 'border-[#636DC7]' },
    'cian-agua': { bg: 'bg-[#4FC0CC]', border: 'border-[#2EA1AE]' },
};
