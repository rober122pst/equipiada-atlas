export function SkeletonBase({ className = '' }) {
    return (
        <div className={`animate-pulse shimmer rounded ${className}`} />
    );
}