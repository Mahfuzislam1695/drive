export type FileItemType = {
    id: string;
    name: string;
    type: 'file' | 'folder';
    parentId: string | null;
    size?: number;
    lastModified?: number;
};

export type FileExplorerState = {
    files: FileItemType[];
    currentFolder: string | null;
    breadcrumbs: string[];
};