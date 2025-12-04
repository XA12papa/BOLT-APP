import Header from "./components/Header";
import Deck from "./components/Deck";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-6">
      <Header />
      <div className="w-full max-w-md mx-auto px-4">
        <Deck />
      </div>
    </main>
  );
}