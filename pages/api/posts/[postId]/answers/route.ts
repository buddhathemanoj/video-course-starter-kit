import { prisma } from 'utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function answerHandler(req: NextApiRequest, res: NextApiResponse) {
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

        const { content } = req.body;

        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }

        // Create the answer
        const answer = await prisma.forumPost.create({
          data: {
            content,
            authorId: session.user.id,
            parentId: postId,
            isQuestion: false,
            lessonId: (await prisma.forumPost.findUnique({
              where: { id: postId },
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
        });

        return res.status(201).json(answer);
      } catch (error) {
        console.error('Error creating answer:', error);
        return res.status(500).json({ error: 'Error creating answer' });
      }

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
