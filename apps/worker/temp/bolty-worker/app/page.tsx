    import Calculator from "@/components/Calculator";

    export default function Home(): JSX.Element {
      return (
        <div className="page">
          <main className="main">
            <h1>Simple Calculator</h1>
            <Calculator />
          </main>
        </div>
      );
    }