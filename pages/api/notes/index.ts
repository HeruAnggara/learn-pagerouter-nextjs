import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi'),
  description: z.string().min(1, 'Description wajib diisi'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validate = formSchema.parse(req.body)
      const response = await fetch(`${process.env.API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validate),
      }).then((res) => res.json())

      return res.status(201).json({
        status: 201,
        message: 'Form successfully submitted',
        data: validate,
      })
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors = Object.keys(error.formErrors.fieldErrors)?.reduce(
          (acc, key) => {
            acc[key] = error.formErrors.fieldErrors[key]?.[0] || 'Unknown error'
            return acc
          },
          {} as Record<string, string>,
        )
        return res.status(400).json({
          status: 400,
          errors: errors,
        })
      }
      return res.status(500).json({
        status: 500,
        message: error.message,
      })
    }
  } else {
    res.status(405).json({
      status: 405,
      message: 'Method not allowed',
    })
  }
}
