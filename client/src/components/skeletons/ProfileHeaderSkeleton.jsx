import { SkeletonBase } from "./SkeletonBase";

export function ProfileHeaderSkeleton() {
    return (
        <div className="flex items-end w-full h-[400px] relative">
            <SkeletonBase className="w-full h-[326px] rounded-3xl absolute left-0 top-0" />
            <div className="flex justify-between items-end w-full z-10 px-12">
                <div id="profile-info" className="flex gap-4">
                    <SkeletonBase className="h-[155px] w-[155px] rounded-3xl" />
                    <div className="flex flex-col justify-around">
                        <SkeletonBase className="h-12 w-48 mb-2" />
                        <div className="flex gap-4">
                            <div>
                                <SkeletonBase className="h-6 w-24 mb-1" />
                                <SkeletonBase className="h-6 w-12" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <SkeletonBase className="h-10 w-32" />
                    <SkeletonBase className="h-10 w-40" />
                </div>
            </div>
        </div>
    );
}