export const AVAILABLE_SVGS = ['buk', 'figma', 'github', 'jira', 'outlook', 'peluchin'] as const;

export type AvailableSvg = (typeof AVAILABLE_SVGS)[number];

export const isAvailableSvg = (value: string): value is AvailableSvg => {
    return (AVAILABLE_SVGS as readonly string[]).includes(value);
};
