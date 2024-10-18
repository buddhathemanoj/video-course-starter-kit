import { NextResponse } from 'next/server'
import { prisma } from 'utils/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function POST(
    request: Request,
    { params }: { params: { postId: string } }
  ) {
    try {
      const session = await getServerSession(authOptions)
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
  
      const { type } = await request.json()
  
      // Check if user has already voted
      const existingVote = await prisma.vote.findUnique({
        where: {
          postId_userId: {
            postId: params.postId,
            userId: session.user.id,
          },
        },
      })
  
      if (existingVote) {
        if (existingVote.type === type) {
          // Remove vote if clicking the same type
          await prisma.vote.delete({
            where: {
              id: existingVote.id,
            },
          })
        } else {
          // Update vote type if different
          await prisma.vote.update({
            where: {
              id: existingVote.id,
            },
            data: {
              type,
            },
          })
        }
      } else {
        // Create new vote
        await prisma.vote.create({
          data: {
            type,
            postId: params.postId,
            userId: session.user.id,
          },
        })
      }
  
      // Get updated vote counts
      const votes = await prisma.vote.findMany({
        where: {
          postId: params.postId,
        },
      })
  
      const upvotes = votes.filter(vote => vote.type === 'UPVOTE').length
      const downvotes = votes.filter(vote => vote.type === 'DOWNVOTE').length
  
      return NextResponse.json({ upvotes, downvotes })
    } catch (error) {
      return NextResponse.json({ error: 'Error processing vote' }, { status: 500 })
    }
  }