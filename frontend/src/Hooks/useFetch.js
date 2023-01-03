import { useState, useEffect } from "react";

export const useFetch = (url, dependencies) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching API :::", url)
        setLoading(true);
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(resp => {
                console.log("resp :", resp);
                setData(resp);
            })
            .catch(err => {
                console.error("err :", err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
        }, dependencies)
        
    return [loading, data, error];
};