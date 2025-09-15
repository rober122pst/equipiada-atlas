import { FaUserFriends } from "react-icons/fa";
import { LuChevronRight } from "react-icons/lu";

function ProfileFriends() {
    function Friend() {
        return (
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-night-950 rounded-full relative">
                    <div className="w-2.5 h-2.5 bg-green-700 rounded-full absolute top-1 right-0.5"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-between bg-night-900 p-4 rounded-3xl w-full gap-2.5">
            <FaUserFriends className="text-3xl text-gray" />
            <div className="flex justify-between w-full  max-w-80">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
            <LuChevronRight className="text-3xl text-raspberry" />
        </div>
    );
}

export default ProfileFriends;