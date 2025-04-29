import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'
import Link from 'next/link'

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

export const getStaticProps = (async () => {
  const notes = await fetch('https://service.pace11.my.id/api/notes').then(
    (res) => res.json(),
  )
  return { props: { notes }, revalidate: 3 }
}) satisfies GetStaticProps<{ notes: Note }>

export default function NoteStaticPage({
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="grid grid-cols-3 space-x-4 space-y-4 gap-4">
      {notes.data.map((note: ListNotes) => (
        <Link
          href={`/notes/server/${note.id}`}
          key={note.id}
          className="flex flex-col gap-2 bg-gray-100 shadow-sm rounded-lg"
        >
          <h1 className="font-semibold capitalize">{note.title}</h1>
          <p>{note.description}</p>
        </Link>
      ))}
    </div>
  )
}
