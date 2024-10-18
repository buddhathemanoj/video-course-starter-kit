import { prisma } from 'utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function forumHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  console.log("req", req)
  console.log("req.query", req.query)
  const lessonId = parseInt(req.query.id as string, 10);
console.log("lessonId", lessonId)
  // Check if lessonId is a valid number
  if (isNaN(lessonId)) {
    return res.status(400).json({ error: 'Missing or invalid lessonId' });
  }

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.forumPost.findMany({
          where: {
            lessonId: lessonId,
            parentId: null, // Only top-level questions
          },
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
            votes: true,
            answers: {
              include: {
                author: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
                votes: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        // Transform the posts to include vote counts
        const transformedPosts = posts.map(post => ({
          ...post,
          upvotes: post.votes.filter(vote => vote.type === 'UPVOTE').length,
          downvotes: post.votes.filter(vote => vote.type === 'DOWNVOTE').length,
          answers: post.answers.map(answer => ({
            ...answer,
            upvotes: answer.votes.filter(vote => vote.type === 'UPVOTE').length,
            downvotes: answer.votes.filter(vote => vote.type === 'DOWNVOTE').length,
          })),
        }));

        return res.status(200).json(transformedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Error fetching posts' });
      }

    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const { content } = req.body;
        console.log("content", content)
        console.log("lessonId", lessonId)
        console.log("session", session)
        console.log("req.body", req.body)

        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }

        const post = await prisma.forumPost.create({
          data: {
            content,
            lessonId: lessonId,
            authorId: session.user.id,
            isQuestion: true,
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

        return res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Error creating post' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
