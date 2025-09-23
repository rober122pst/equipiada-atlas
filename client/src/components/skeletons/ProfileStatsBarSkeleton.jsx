import { SkeletonBase } from "./SkeletonBase";
import { LuClock, LuGamepad, LuFlag, LuMedal, LuTrophy } from "react-icons/lu";

export function ProfileStatsBarSkeleton() {
    return (
        <div className="flex justify-around items-center p-4 border-2 rounded-2xl border-rich-900 w-full h-[116px]">
            <div className="flex gap-2 items-center">
                <LuClock className="text-raspberry text-5xl" />
                <div>
                    <SkeletonBase className="h-8 w-20 mb-2" />
                    <SkeletonBase className="h-6 w-12" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <LuGamepad className="text-raspberry text-5xl" />
                <div>
                    <SkeletonBase className="h-8 w-20 mb-2" />
                    <SkeletonBase className="h-6 w-12" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <LuFlag className="text-raspberry text-5xl" />
                <div>
                    <SkeletonBase className="h-8 w-20 mb-2" />
                    <SkeletonBase className="h-6 w-12" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <LuMedal className="text-raspberry text-5xl" />
                <div>
                    <SkeletonBase className="h-8 w-20 mb-2" />
                    <SkeletonBase className="h-6 w-12" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <LuTrophy className="text-raspberry text-5xl" />
                <div>
                    <SkeletonBase className="h-8 w-20 mb-2" />
                    <SkeletonBase className="h-6 w-12" />
                </div>
            </div>
        </div>
    );
}