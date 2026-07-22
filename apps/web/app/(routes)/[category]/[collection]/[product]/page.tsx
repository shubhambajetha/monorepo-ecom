type prop = {
    params:Promise<{
        slug:string
    }>
}

export default async function page({params}:prop) {
    const {slug} = await params

  return <>
  <h1>{slug}</h1>
  </>;
}
