import { useState } from 'react';

interface UploadFileModalProps {
    onClose: () => void;
    onUpload: (file: File) => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ onClose, onUpload }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        onUpload(file);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl text-sky-500 font-bold mb-4">Upload File</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded mb-4 placeholder:text-gray-500 text-black"
                    />
                    {file && (
                        <div className="mb-4 text-sky-500">
                            <p>File: {file.name}</p>
                            <p>Size: {(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sky-500 hover:border-red-600 cursor-pointer border border-sky-500 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded"
                            disabled={!file}
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadFileModal;