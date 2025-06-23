import Calendar from "./calendar";
import Layout from "./layout";

import Header from "./header";
import { createPortal } from "react-dom";
import EventModal from "./event-modal";
import CreateEvent from "./create-event";
import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEventsContext } from "../hooks/useEventsContext";

const Home = () => {
  const { showForm } = useCalendarContext();
  const { viewEvent } = useEventsContext();
  return (
    <main className="h-dvh px-6">
      <Header />
      <section className="grid md:[grid-template-columns:18rem_1fr]  gap-4">
        <Calendar />
        <Layout />
      </section>

      {showForm && createPortal(<CreateEvent />, document.body)}
      {viewEvent && createPortal(<EventModal />, document.body)}
    </main>
  );
};

export default Home;
