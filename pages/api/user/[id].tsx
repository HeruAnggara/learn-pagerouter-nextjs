import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id?: string | string[] | undefined
  name: string
  data?: object
  headers?: string | string[] | undefined
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    res.status(200).json({ id: req.query.id, name: `method ${req.method}` })
  }

  if (req.method === 'POST') {
    res.status(200).json({
      id: req.query.id,
      name: `method ${req.method}`,
      data: req.body,
      headers: req.headers['content-type'],
    })
  }
}
