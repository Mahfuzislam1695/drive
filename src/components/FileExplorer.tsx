import { useState } from 'react';
import FileItem from './FileItem';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import CreateFolderModal from './Modals/CreateFolderModal';
import UploadFileModal from './Modals/UploadFileModal';
import { FileExplorerState, FileItemType } from '../types/types';

interface FileExplorerProps {
    state: FileExplorerState;
    setState: React.Dispatch<React.SetStateAction<FileExplorerState>>;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ state, setState }) => {
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [showUploadFileModal, setShowUploadFileModal] = useState(false);

    const currentFiles = state.files.filter(
        (file) => file.parentId === state.currentFolder
    );

    const handleFolderDoubleClick = (folderId: string, folderName: string) => {
        setState((prev) => ({
            ...prev,
            currentFolder: folderId,
            breadcrumbs: [...prev.breadcrumbs, folderName],
        }));
    };

    const handleBackClick = () => {
        if (state.breadcrumbs.length > 1) {
            setState((prev) => {
                const newBreadcrumbs = [...prev.breadcrumbs];
                newBreadcrumbs.pop();
                return {
                    ...prev,
                    currentFolder: state.files.find(
                        (f) => f.id === prev.currentFolder
                    )?.parentId || null,
                    breadcrumbs: newBreadcrumbs,
                };
            });
        }
    };

    const handleDelete = (id: string) => {
        setState((prev) => ({
            ...prev,
            files: prev.files.filter((file) => file.id !== id),
        }));
    };

    const handleCreateFolder = (folderName: string) => {
        const newFolder: FileItemType = {
            id: Date.now().toString(),
            name: folderName,
            type: 'folder',
            parentId: state.currentFolder,
        };

        setState((prev) => ({
            ...prev,
            files: [...prev.files, newFolder],
        }));
        setShowCreateFolderModal(false);
    };

    const handleUploadFile = (file: File) => {
        const newFile: FileItemType = {
            id: Date.now().toString(),
            name: file.name,
            type: 'file',
            parentId: state.currentFolder,
            size: file.size,
            lastModified: file.lastModified,
        };

        setState((prev) => ({
            ...prev,
            files: [...prev.files, newFile],
        }));
        setShowUploadFileModal(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <FolderBreadcrumbs breadcrumbs={state.breadcrumbs} />
                <div className="space-x-2">
                    <button
                        onClick={() => setShowCreateFolderModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        New Folder
                    </button>
                    <button
                        onClick={() => setShowUploadFileModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Upload File
                    </button>
                </div>
            </div>

            {state.breadcrumbs.length > 1 && (
                <button
                    onClick={handleBackClick}
                    className="mb-4 text-blue-500 hover:underline"
                >
                    ← Back
                </button>
            )}

            <div className="grid text-sky-500 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentFiles.map((file) => (
                    <FileItem
                        key={file.id}
                        item={file}
                        onDoubleClick={handleFolderDoubleClick}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showCreateFolderModal && (
                <CreateFolderModal
                    onClose={() => setShowCreateFolderModal(false)}
                    onCreate={handleCreateFolder}
                />
            )}

            {showUploadFileModal && (
                <UploadFileModal
                    onClose={() => setShowUploadFileModal(false)}
                    onUpload={handleUploadFile}
                />
            )}
        </div>
    );
};

export default FileExplorer;