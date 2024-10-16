import { prisma } from 'utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse<User[] | User>) {
  const { method } = req
  const session = await getServerSession(req, res, authOptions)
  if (!session) res.status(401).end();

  console.log("Session", JSON.stringify(session, null, 2))

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).end();
      }
      break
    
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}