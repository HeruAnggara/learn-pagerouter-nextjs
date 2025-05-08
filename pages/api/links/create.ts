import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'

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
      const payload = JSON.parse(req.body)

      const data = await db
        .insert(linksTable)
        .values(payload)
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
