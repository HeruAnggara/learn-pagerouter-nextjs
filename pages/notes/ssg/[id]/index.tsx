import {
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'

type ListNotes = {
  id: number
  title: string
  description: string
  deleted_at: string
  created_at: string
  updated_at: string
}

type Note = {
  success: boolean
  message: string
  data: ListNotes
  meta: object
}

export const getStaticPaths = async () => {
  const notes = await fetch('https://service.pace11.my.id/api/notes').then(
    (res) => res.json(),
  )
  const paths = notes.data.map((note: ListNotes) => ({
    params: { id: note.id },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps = (async (context) => {
  const { params } = context
  const notes = await fetch(
    `https://service.pace11.my.id/api/note/${params?.id}`,
  ).then((res) => res.json())

  return { props: { notes } }
}) satisfies GetStaticProps<{ notes: Note }>

export default function NoteStaticPage({
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 shadow-sm rounded-lg">
      <h1 className="font-semibold capitalize">{notes.data.title}</h1>
      <p>{notes.data.description}</p>
    </div>
  )
}
