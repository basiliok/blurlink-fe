export const getDisplayUrl = (url: string): string => {
    try {
        const urlObj = new URL(url);
        const host = urlObj.hostname.replace(/^www\./, '');
        const hasPath = urlObj.pathname !== '/' || urlObj.search;

        if (!hasPath) return host;

        const pathStart = urlObj.pathname.slice(1, 2);
        return `${host}/${pathStart}...`;
    } catch {
        return url;
    }
};
