import Link from "next/link";

import { TopInfo, TopsLists } from "./data.constans";

export default function Las10Mas() {
  return (
    <main className="container pt-12">
      <div className="row">
        <div className="col-12 ">
          <div className="flex align-middle justify-center h-16 text-center">
            <h1 className="text-principal text-4xl font-bold">
              Top 10
            </h1>
          </div>
        </div>
        <div className="col-12">
          <div className="flex align-middle justify-center text-center">
            <span className="text-principal text-xl font-bold">
              ¿Cuántos profesionistas tiene cada carrera? ¿cuáles tienen más mujeres y hombres? ¿cuáles ofrecen mejor salario? ¿cuáles carreras tienen una mayor tasa de desempleo? entre otras.
            </span>
          </div>
        </div>
      </div>
      <div className="row mt-10 lg:px-12 xl:px-20">
        {TopsLists.map((top: TopInfo) => (
          <div className="col-12 col-md-4 mb-4" key={top.titleUrl}>
            <Link href={"/las-10-mas/" + top.titleUrl}>
              <div className="card shadow-md rounded-2xl py-3 px-2 lg:h-40 h-52  text-center bg-slate-100 shadow-blue-500/50 text-xl">
                <div className="flex flex-col align-middle justify-center h-full">
                  {top.topName}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
