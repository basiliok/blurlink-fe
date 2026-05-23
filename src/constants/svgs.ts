export const AVAILABLE_SVGS = [
    'azure',
    'buk',
    'claude',
    'drive',
    'excel',
    'facebook',
    'figma',
    'github',
    'gmail',
    'google-analytics',
    'jira',
    'linkedin',
    'netflix',
    'onedrive',
    'outlook',
    'peluchin',
    'pinterest',
    'power-point',
    'slack',
    'telegram',
    'whatsapp',
    'x',
    'youtube',
] as const;

export type AvailableSvg = (typeof AVAILABLE_SVGS)[number];

export const isAvailableSvg = (value: string): value is AvailableSvg => {
    return (AVAILABLE_SVGS as readonly string[]).includes(value);
};
