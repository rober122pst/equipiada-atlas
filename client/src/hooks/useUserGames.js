import { useEffect } from "react";
import { useState } from "react";
import { getUserGames } from "../services/userGamesService";

export function useUserGames(userId) {
    const [userGames, setUserGames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fecthData = async () => {
            setLoading(true);

            await getUserGames(userId)
             .then(data => setUserGames(data))
             .catch(err => setError(err))
             .finally(() => setLoading(false))
        }
        fecthData()
    }, [userId]);

    return { userGames, loading, error }
}