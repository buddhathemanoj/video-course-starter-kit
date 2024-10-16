'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp, ChevronDown, MessageCircle } from "lucide-react"

interface ForumPost {
  id: number
  content: string
  author: string
  upvotes: number
  downvotes: number
  isQuestion: boolean
  answers: ForumPost[]
}

interface LessonForumProps {
  lessonId: string
  initialPosts: ForumPost[]
}

export default function LessonForum({ lessonId, initialPosts = [] }: LessonForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [newQuestionContent, setNewQuestionContent] = useState('')
  const [newAnswerContent, setNewAnswerContent] = useState<{ [key: number]: string }>({})

  const addQuestion = () => {
    if (newQuestionContent.trim()) {
      const newQuestion: ForumPost = {
        id: Date.now(),
        content: newQuestionContent,
        author: 'Current Student',
        upvotes: 0,
        downvotes: 0,
        isQuestion: true,
        answers: []
      }
      setPosts([newQuestion, ...posts])
      setNewQuestionContent('')
    }
  }

  const addAnswer = (questionId: number) => {
    const answerContent = newAnswerContent[questionId]
    if (answerContent && answerContent.trim()) {
      setPosts(posts.map(post => 
        post.id === questionId
          ? {
              ...post,
              answers: [
                ...post.answers,
                {
                  id: Date.now(),
                  content: answerContent,
                  author: 'Current Student',
                  upvotes: 0,
                  downvotes: 0,
                  isQuestion: false,
                  answers: []
                }
              ]
            }
          : post
      ))
      setNewAnswerContent({ ...newAnswerContent, [questionId]: '' })
    }
  }

  const votePost = (postId: number, isUpvote: boolean, isAnswer = false, questionId?: number) => {
    if (isAnswer && questionId) {
      setPosts(posts.map(post => 
        post.id === questionId
          ? {
              ...post,
              answers: post.answers.map(answer => 
                answer.id === postId
                  ? { 
                      ...answer, 
                      upvotes: isUpvote ? answer.upvotes + 1 : answer.upvotes,
                      downvotes: !isUpvote ? answer.downvotes + 1 : answer.downvotes
                    }
                  : answer
              )
            }
          : post
      ))
    } else {
      setPosts(posts.map(post =>
        post.id === postId 
          ? { 
              ...post, 
              upvotes: isUpvote ? post.upvotes + 1 : post.upvotes,
              downvotes: !isUpvote ? post.downvotes + 1 : post.downvotes
            } 
          : post
      ))
    }
  }

  return (
    <div className="w-full  mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Next.js SSR Lesson Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Ask a question about Next.js SSR..."
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
            className="mb-2"
          />
          <Button onClick={addQuestion}>Post Question</Button>
        </CardContent>
      </Card>

      {posts.map(post => (
        <Card key={post.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                  onClick={() => votePost(post.id, true)}
                  aria-label={`Upvote question by ${post.author}`}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium">{post.upvotes}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                  onClick={() => votePost(post.id, false)}
                  aria-label={`Downvote question by ${post.author}`}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium">{post.downvotes}</span>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground mb-1">{post.author}</p>
                <p className="text-base">{post.content}</p>
              </div>
            </div>

            {post.answers.map(answer => (
              <Card key={answer.id} className="mb-2 ml-8">
                <CardContent className="py-4 flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-6 h-6 rounded-full"
                      onClick={() => votePost(answer.id, true, true, post.id)}
                      aria-label={`Upvote answer by ${answer.author}`}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-medium">{answer.upvotes}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-6 h-6 rounded-full"
                      onClick={() => votePost(answer.id, false, true, post.id)}
                      aria-label={`Downvote answer by ${answer.author}`}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-medium">{answer.downvotes}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-1">{answer.author}</p>
                    <p className="text-sm">{answer.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-2 ml-8">
              <Input
                type="text"
                placeholder="Write an answer..."
                value={newAnswerContent[post.id] || ''}
                onChange={(e) => setNewAnswerContent({ ...newAnswerContent, [post.id]: e.target.value })}
                className="mb-2"
              />
              <Button onClick={() => addAnswer(post.id)} size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}