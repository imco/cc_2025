export async function generateStaticParams() {
  const tops = await fetch('https://.../las-10-mas').then((res) => res.json())

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return tops.map((top: any) => ({
    slug: top.slug,
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
