import Calendar from "./calendar";
import Header from "./header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="grid [grid-template-columns:20rem_1fr] px-6 gap-4 pb-4">
        <Calendar />
        <section className="bg-white rounded-2xl"></section>
      </main>
    </>
  );
};

export default Home;
