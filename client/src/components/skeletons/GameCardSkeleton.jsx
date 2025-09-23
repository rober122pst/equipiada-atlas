import { SkeletonBase } from './SkeletonBase.jsx';

export function GameCardSkeleton({ large = false, details = false }) {
    return (
        <div className='flex items-center gap-2.5 p-2.5'>
            <div><SkeletonBase className={`${large ? 'h-[125px] w-[189px]' : 'h-[90px] w-[90px]'} rounded-lg`} /></div>
            <div className='flex flex-col gap-2'>
                <SkeletonBase className='h-8 w-48 rounded' />
                <SkeletonBase className='h-6 w-32 rounded' />
                <SkeletonBase className='h-10 w-20 rounded' />
                {details && <SkeletonBase className='h-6 w-24 rounded' />}
            </div>
        </div>
    );
}