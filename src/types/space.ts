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

export type LinkType = 'link' | 'superlink';

export interface Link {
    id: string;
    userId: string;
    spaceId: string;
    chainId: string;
    type: LinkType;
    title: string;
    url: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

export interface MiniLinkItem {
    label: string;
    url: string;
}

export interface SuperLink {
    id: string;
    userId: string;
    spaceId: string;
    chainId: string;
    type: LinkType;
    title: string;
    note: string;
    minilinks: MiniLinkItem[];
    createdAt: string;
    updatedAt: string;
}

export type LinkItem = Link | SuperLink;
