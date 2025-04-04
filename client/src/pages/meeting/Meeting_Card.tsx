import React from "react";
import { CalendarIcon, CopyIcon } from "../../assets/Icon";
import Button from "../../components/ui/Button";

const Meeting_Card = () => {
  return (
    <section className="card bg-blue-900 rounded-2xl py-8 px-6 flex flex-col gap-2 ">
      <span>
        <CalendarIcon width="24" height="24" />
      </span>
      <h2 className="text-white-80 text-2xl font-bold">Meeting 1</h2>
      <p className="text-white-80 font-normal text-sm">12:00 PM - 1:00 PM</p>
      <div className="flex_center_y gap-2 justify-end">
        <Button className="!rounded-lg !w-fit">Start</Button>
        <Button type="secondary" className="!rounded-lg !w-fit">
          <CopyIcon />
          <span>Copy Invitation</span>
        </Button>
      </div>
    </section>
  );
};

export default Meeting_Card;
