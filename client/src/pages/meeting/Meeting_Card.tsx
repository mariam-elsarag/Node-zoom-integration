import React from "react";
import { CalendarIcon, CopyIcon } from "../../assets/Icon";
import Button from "../../components/ui/Button";

const Meeting_Card = ({ data }) => {
  return (
    <section className="card bg-blue-900 rounded-2xl py-8 px-6 flex flex-col gap-2 ">
      <span>
        <CalendarIcon width="24" height="24" />
      </span>
      <h2 className="text-white-80 text-2xl font-bold capitalize ">
        {data?.topic}
      </h2>
      <p className="text-white-80 font-normal text-sm">
        {data?.start_time && (
          <>
            {new Date(data.start_time).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}{" "}
          </>
        )}
      </p>
      {data?.zoom_url && (
        <div className="flex_center_y gap-2 justify-end">
          <Button
            className="!rounded-lg !w-fit"
            to={data?.zoom_url}
            target="_blank"
          >
            Start
          </Button>
        </div>
      )}
    </section>
  );
};

export default Meeting_Card;
