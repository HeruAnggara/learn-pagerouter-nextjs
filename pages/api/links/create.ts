import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'
import { getToken } from 'next-auth/jwt'

type Response = {
  insertId?: number
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>,
) {
  if (req.method === 'POST') {
    try {
      const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      })
      const payload = JSON.parse(req.body)

      const data = await db
        .insert(linksTable)
        .values({ ...payload, email: String(session?.email) })
        .returning({ insertId: linksTable.id })

      return res.status(201).json({ data })
    } catch (error: any) {
      return res.status(500).json({
        data: [{ message: error.message }],
      })
    }
  } else {
    res.status(405).json({
      data: [{ message: 'Method not allowed' }],
    })
  }
}
