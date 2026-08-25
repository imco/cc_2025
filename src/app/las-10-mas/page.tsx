import Link from "next/link";

import { TopInfo, TopsLists } from "./data.constans";

export default function Las10Mas() {
  return (
    <section id="top10s-section" className="top10s-section mt-5">
      <h1 className="section-title">Las 10 más</h1>
      <div className="top10s-grid-container">
        <div className="top10s-grid">
          {
            TopsLists.map((top: TopInfo) => (
              <div className="top10-card" key={top.titleUrl}>
                <Link href={"/las-10-mas/" + top.titleUrl}>
                  <div className="top10-card-icon">
                    <top.icon size={26} />
                  </div>
                  <h3>
                    {top.topName}
                  </h3>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
