import Agenda from "agenda";
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
const agenda = new Agenda({
  db: {
    address: DB,
    collection: "meetingAgenda",
  },
  processEvery: "30 seconds",
});

export default agenda;
