    import Calculator from "@/components/Calculator";

    export default function Home() {
      return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
            <h1 className="text-3xl font-semibold">Simple Calculator</h1>
            <div className="w-full flex justify-center">
              <Calculator />
            </div>
          </main>
        </div>
      );
    }