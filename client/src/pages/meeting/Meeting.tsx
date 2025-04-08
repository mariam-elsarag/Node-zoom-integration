import { useEffect } from "react";
import Empty from "../../components/ui/Empty";

import useGetPaginatedData from "../../hooks/useGetPaginatedData";
import Meeting_Card from "./Meeting_Card";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";

const Meeting = () => {
  const isUpcoming = location.pathname.includes("upcoming");
  const { data, fetchData, loading, hasMore, handleMoreData } =
    useGetPaginatedData(
      `/api/meet?status=${isUpcoming ? "upcoming" : "previous"}`
    );
  console.log(`/api/meet?status=${isUpcoming ? "upcoming" : "previous"}`);
  useEffect(() => {
    fetchData();
  }, [isUpcoming]);
  const title = isUpcoming ? "Upcoming Meetings" : "Previous Meetings";

  return (
    <section className="grid gap-8">
      <h2 className="text-lg sm:text-xl md:text-2xl text-white font-bold">
        {title}
      </h2>
      {loading ? (
        <div className="min-h-[40vh] flex_center flex-col">
          <Spinner className="!w-8 !h-8" />
        </div>
      ) : data?.length > 0 ? (
        <section className="grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.map((item) => (
              <Meeting_Card key={item.id} data={item} />
            ))}
          </div>
          {hasMore && (
            <Button className="!rounded-lg" onClick={handleMoreData}>
              Show More
            </Button>
          )}
        </section>
      ) : (
        <Empty />
      )}
    </section>
  );
};

export default Meeting;
