import { useEffect } from "react";
import { useState } from "react";
import { getUserById } from "../services/userService";

export function useUserProfile(userId) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fecthData = async () => {
            setLoading(true);

            await getUserById(userId)
             .then(data => setUser(data))
             .catch(err => setError(err))
             .finally(() => setLoading(false))
        }
        fecthData()
    }, [userId]);

    return { user, loading, error }
}