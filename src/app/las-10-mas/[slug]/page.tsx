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
