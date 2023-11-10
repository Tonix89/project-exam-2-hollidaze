import { async } from "q";
import { useState, useEffect } from "react";

function GetVenue(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIserror] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setIserror(false);
                const fetchedData = await fetch(url);
                const result = await fetchedData.json();
                setData(result);
            } catch (error) {
                console.log(error)
                setData(error);
                setIserror(true);
            }finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [url]);

    return {data, isLoading, isError};
};

export default GetVenue;
