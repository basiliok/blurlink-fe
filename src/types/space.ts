export interface Space {
    id: string;
    userId: string;
    name: string;
    slug: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

export interface Chain {
    id: string;
    userId: string;
    spaceId: string;
    chainName: string;
    position: number;
    width: number;
    height: number;
    linkStyle: 'classic' | 'modern' | 'minimal';
    linkDirection: 'horizontal' | 'vertical';
    linkSize: 'small' | 'medium' | 'large';
    note: string;
    createdAt: string;
    updatedAt: string;
}

export type LinkType = 'simple' | 'multi';

export interface SimpleLink {
    id: string;
    userId: string;
    spaceId: string;
    chainId: string;
    type: 'simple';
    title: string;
    url: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Bulk Simple Link Creation
 */
export interface BulkSimpleLinkItem {
    title: string;
    url: string;
}

export interface CreateBulkLinksRequest {
    spaceId: string;
    chainId: string;
    links: BulkSimpleLinkItem[];
}

export interface BulkSimpleLinksResponse {
    created: number;
    links: SimpleLink[];
}

/**
 * MultiLink
 */
export interface MiniLinkItem {
    label: string;
    url: string;
}

export interface MultiLink {
    id: string;
    userId: string;
    spaceId: string;
    chainId: string;
    type: 'multi';
    title: string;
    note: string;
    minilinks: MiniLinkItem[];
    createdAt: string;
    updatedAt: string;
}

export type LinkItem = SimpleLink | MultiLink;
