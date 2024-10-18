import { NextResponse } from 'next/server'
import { prisma } from 'utils/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function POST(
    request: Request,
    { params }: { params: { postId: string } }
  ) {
    try {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
  
      const { content } = await request.json()
  
      const answer = await prisma.forumPost.create({
        data: {
          content,
          authorId: session.user.id,
          parentId: params.postId,
          isQuestion: false,
          lessonId: (await prisma.forumPost.findUnique({
            where: { id: params.postId },
            select: { lessonId: true },
          }))!.lessonId,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          votes: true,
        },
      })
  
      return NextResponse.json(answer)
    } catch (error) {
      return NextResponse.json({ error: 'Error creating answer' }, { status: 500 })
    }
  }