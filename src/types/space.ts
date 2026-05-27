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
    name: string;
    url: string;
    note: string;
    rank: string;
    icon: string;
    subIcon?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Bulk Simple Link Creation
 */
export interface LinkFormItem {
    name: string;
    url: string;
    icon: string;
}

export interface BulkSimpleLinkItem {
    name: string;
    url: string;
    rank: string;
    icon: string;
    subIcon: string;
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

export interface UpdateSimpleLinkRequest {
    chainId: string;
    name: string;
    url: string;
    note: string;
    rank: string;
    icon: string;
}

export interface UpdateSimpleLinkParams {
    linkId: string;
    body: UpdateSimpleLinkRequest;
}

export interface DeleteSimpleLinkRequest {
    chainId: string;
}

export interface DeleteSimpleLinkParams {
    linkId: string;
    body: DeleteSimpleLinkRequest;
}

/**
 * MultiLink
 */
export interface MiniLinkItem {
    name: string;
    url: string;
    icon: string;
}

export interface MultiLink {
    id: string;
    userId: string;
    spaceId: string;
    chainId: string;
    type: 'multi';
    name: string;
    note: string;
    rank: string;
    icon: string;
    minilinks: MiniLinkItem[];
    createdAt: string;
    updatedAt: string;
}

export type LinkItem = SimpleLink | MultiLink;
