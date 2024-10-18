import { prisma } from 'utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function voteHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const postId = req.query.postId as string; // Get postId from query parameters

  // Validate postId
  if (!postId) {
    return res.status(400).json({ error: 'Missing postId' });
  }

  switch (method) {
    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const { type } = req.body;

        // Validate vote type
        if (!['UPVOTE', 'DOWNVOTE'].includes(type)) {
          return res.status(400).json({ error: 'Invalid vote type' });
        }

        // Check if user has already voted
        const existingVote = await prisma.vote.findUnique({
          where: {
            postId_userId: {
              postId,
              userId: session.user.id,
            },
          },
        });

        if (existingVote) {
          if (existingVote.type === type) {
            // Remove vote if clicking the same type
            await prisma.vote.delete({
              where: {
                id: existingVote.id,
              },
            });
          } else {
            // Update vote type if different
            await prisma.vote.update({
              where: {
                id: existingVote.id,
              },
              data: {
                type,
              },
            });
          }
        } else {
          // Create new vote
          await prisma.vote.create({
            data: {
              type,
              postId,
              userId: session.user.id,
            },
          });
        }

        // Get updated vote counts
        const votes = await prisma.vote.findMany({
          where: {
            postId,
          },
        });

        const upvotes = votes.filter(vote => vote.type === 'UPVOTE').length;
        const downvotes = votes.filter(vote => vote.type === 'DOWNVOTE').length;

        return res.status(200).json({ upvotes, downvotes });
      } catch (error) {
        console.error('Error processing vote:', error);
        return res.status(500).json({ error: 'Error processing vote' });
      }

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
