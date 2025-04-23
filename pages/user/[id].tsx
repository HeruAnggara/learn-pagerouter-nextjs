import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()
  return (
    <>
      <h3 className="text-xl font-bold">User: {router.query.id}</h3>
    </>
  )
}
