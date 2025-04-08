import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function useGetPaginatedData(endpoint: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = <number>useState(1);
  const [pages, setPages] = <number | null>useState(1);
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchData = async (currentPage: number) => {
    try {
      setLoading(true);
      setData([]);
      const response = await axiosInstance.get(endpoint, {
        params: { page: currentPage },
      });

      if (response.data.next) {
        setHasMore(true);
        setPage(response.data.page);
        setPages(response.data.pages);
      } else {
        setHasMore(false);
      }
      if (response.status === 200) {
        const fetchedData = response.data.results;
        if (Array.isArray(fetchedData)) {
          setData((prevData) => {
            const allData =
              currentPage === 1
                ? [...fetchedData]
                : [...prevData, ...fetchedData];
            return allData;
          });
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  const handleMoreData = () => {
    if (hasMore) {
      fetchData(page + 1);
      setPage((pre) => pre + 1);
    }
  };

  return { data, loading, page, pages, hasMore, fetchData, handleMoreData };
}
export default useGetPaginatedData;
