import { TopInfo, TopsLists } from "../data.constans"

export async function generateStaticParams() {
  return TopsLists.map((top: TopInfo) => ({
    slug: top.titleUrl,
  }))
}

export default async function Page({ params }: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  return (
    <main>
      La url es: {slug}
    </main>
  )
}
