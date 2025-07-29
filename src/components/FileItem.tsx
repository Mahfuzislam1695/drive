import { useState } from 'react';
import { FileItemType } from '../types/types';

interface FileItemProps {
    item: FileItemType;
    onDoubleClick: (id: string, name: string) => void;
    onDelete: (id: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ item, onDoubleClick, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDoubleClick = () => {
        if (item.type === 'folder') {
            onDoubleClick(item.id, item.name);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
    };

    return (
        <div
            className={`border rounded-lg p-4 relative ${isHovered ? 'bg-gray-50' : ''
                } cursor-pointer`}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <button
                    onClick={handleDelete}
                    className="absolute top-1 right-1 text-red-500"
                    title="Delete"
                >
                    ×
                </button>
            )}
            <div className="flex flex-col items-center">
                {item.type === 'folder' ? (
                    <svg
                        className="w-16 h-16 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-16 h-16 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                )}
                <span className="mt-2 text-center truncate w-full">{item.name}</span>
                {item.type === 'file' && (
                    <span className="text-xs text-gray-500">
                        {(item.size! / 1024).toFixed(1)} KB
                    </span>
                )}
            </div>
        </div>
    );
};

export default FileItem;