import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";


const ProfilePage = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="p-20 rounded-xl shadow-xl">
                <h1 className="text-2xl font-semibold">Welcome, {session?.user.name}</h1>
                <p className="text-center text-base pt-3">Email : {session?.user.email}</p>
            </div>
        </div>
    );
};

export default ProfilePage;