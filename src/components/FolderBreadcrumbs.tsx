interface FolderBreadcrumbsProps {
    breadcrumbs: string[];
}

const FolderBreadcrumbs: React.FC<FolderBreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <div className="flex items-center">
            {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <span className="text-gray-700">{crumb}</span>
                </div>
            ))}
        </div>
    );
};

export default FolderBreadcrumbs;