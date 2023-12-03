import { useState, useEffect } from "react";

function GetVenue(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIserror] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIserror(false);
        const fetchedData = await fetch(url);
        const result = await fetchedData.json();
        if (result.errors) {
          setIserror(true);
          setData(result.errors[0]);
        } else {
          setData(result);
        }
      } catch (error) {
        setIserror(true);
        setData(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, isError };
}

export default GetVenue;
