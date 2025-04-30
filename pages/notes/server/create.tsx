import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NotesServerCreate() {
  const router = useRouter()
  const [payload, setPayload] = useState<{
    title: string
    description: string
  }>({
    title: '',
    description: '',
  })
  const [isLoading, setIdLoading] = useState<boolean>(false)
  const [error, setError] = useState<{
    errors: { [key: string]: string }
  } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIdLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.status !== 201) {
        const errorData = await response.json()
        setError(errorData)
        return
      }

      const data = await response.json()
      router.push(`/notes/server`)
    } catch (error) {
      return error
    } finally {
      setIdLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Notes</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={payload.title}
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full"
          />
          {error && error.errors && (
            <p className="text-red-500 text-sm mt-1">{error.errors.title}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={payload.description}
            onChange={(e) =>
              setPayload({ ...payload, description: e.target.value })
            }
            className="mt-1 p-2 border rounded-md w-full"
          ></textarea>
          {error && error.errors && (
            <p className="text-red-500 text-sm mt-1">
              {error.errors.description}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
