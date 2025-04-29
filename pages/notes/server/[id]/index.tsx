import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
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

export const getServerSideProps = (async (context) => {
  const { params } = context
  const notes = await fetch(
    `https://service.pace11.my.id/api/note/${params?.id}`,
  ).then((res) => res.json())

  return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Note }>

export default function NoteServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 shadow-sm rounded-lg">
      <h1 className="font-semibold capitalize">{notes.data.title}</h1>
      <p>{notes.data.description}</p>
    </div>
  )
}
