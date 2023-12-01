import { useState, useEffect } from "react";
import { getToken } from "../../tools/Token";

function GetApi(url) {
  const token = getToken();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIserror] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIserror(false);
        const fetchedData = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await fetchedData.json();
        setData(result);
      } catch (error) {
        setData(error);
        setIserror(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, token]);

  return { data, isLoading, isError };
}

export default GetApi;
