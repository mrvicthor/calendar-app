import Calendar from "./calendar";
import Layout from "./layout";

import Header from "./header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="grid [grid-template-columns:18rem_1fr] px-6 gap-4 h-[90vh]">
        <Calendar />
        <Layout />
      </main>
    </>
  );
};

export default Home;
