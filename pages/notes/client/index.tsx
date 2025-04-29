import Link from 'next/link'
import useSWR from 'swr'

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

const fetcher = (url: string) => fetch(url).then((res) => res.json())
export default function NoteClientPage() {
  const { data, isLoading, error } = useSWR(
    'https://service.pace11.my.id/api/notes',
    fetcher,
    {
      //   revalidateOnFocus: true,
      refreshInterval: 1000,
    },
  )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error</div>

  return (
    <div className="grid grid-cols-3 space-x-4 space-y-4 gap-4">
      {data?.data.map((note: ListNotes) => (
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
