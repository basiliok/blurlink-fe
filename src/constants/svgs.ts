// 'default' is intentionally first — it's the fallback option, not a brand. The rest stay alphabetical.
export const AVAILABLE_SVGS = [
    'default',
    'azure',
    'buk',
    'chatgpt',
    'claude',
    'drive',
    'excel',
    'facebook',
    'figma',
    'firebase',
    'gemini',
    'github',
    'gmail',
    'google-analytics',
    'instagram',
    'jira',
    'linkedin',
    'namecheap',
    'netflix',
    'onedrive',
    'outlook',
    'peluchin',
    'pinterest',
    'power-point',
    'slack',
    'telegram',
    'tiktok',
    'twitch',
    'whatsapp',
    'x',
    'youtube',
] as const;

export type AvailableSvg = (typeof AVAILABLE_SVGS)[number];

export const isAvailableSvg = (value: string): value is AvailableSvg => {
    return (AVAILABLE_SVGS as readonly string[]).includes(value);
};
