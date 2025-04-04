import React, { useState } from "react";
import Hero from "./Hero";
import Button from "../../components/ui/Button";
import { CalendarIcon, PlusIcon } from "../../assets/Icon";
import Card from "../../components/ui/Card";
import Meeting_Card from "../meeting/Meeting_Card";
import Dialog from "../../components/ui/Dialog";
import Form from "../../components/ui/form/Form";
import { useForm } from "react-hook-form";

const Home = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [meetingType, setMeetingType] = useState<string | null>(null);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { topic: "" },
    mode: "onChange",
  });
  const list = [
    {
      id: 0,
      icon: <PlusIcon width="24" height="24" />,
      title: "New Meeting",
      description: "Setup a new recording",
      action: () => {
        setVisible(true);
        setMeetingType("meet");
      },
      className: "bg-[#FF742E]",
    },
    {
      id: 1,
      icon: <CalendarIcon width="24" height="24" />,
      title: "Schedule Meeting",
      description: "Plan your meeting",
      action: () => {
        setVisible(true);
        setMeetingType("schedule");
      },
      className: "bg-[#830EF9]",
    },
  ];
  const formList = [
    {
      id: 0,
      formType: "input",
      type: "text",
      fieldName: "topic",
      validator: {
        required: "Topic is required",
        maxLength: {
          value: 100,
          message: "Topic should be less than 100 characters",
        },
      },
      label: "Topic",
      placeholder: "Enter meeting topic",
    },
    meetingType === "schedule"
      ? {
          id: 1,
          formType: "input",
          type: "datetime-local",
          fieldName: "start_time",
          validator: {
            required: "Date & Time is required",
          },
          label: "Date & Time",
          placeholder: "Select Date & Time",
        }
      : null,

    {
      id: 5,
      formType: "textarea",
      fieldName: "agenda",
      validator: {
        required: "Agenda is required",
        maxLength: {
          value: 500,
          message: "Agenda should be less than 500 characters",
        },
      },
      label: "Agenda",
      placeholder: "Enter meeting agenda",
    },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col gap-8">
      <Hero />
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {list?.map((item) => (
          <Card key={item?.id} data={item} />
        ))}
      </section>
      <Meeting_Card />
      <Dialog
        header={
          meetingType === "schedule"
            ? "Schedule a new meeting"
            : "Create Meeting"
        }
        visibility={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
          />
        </form>
      </Dialog>
    </section>
  );
};

export default Home;
