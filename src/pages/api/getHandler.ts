import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

export default function getHandler() {
  
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      if (error?.response?.status === 400) {
        return res.status(400).end()
      }
      return res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` })
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    },
  })
}
