// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChevronUp, ChevronDown, MessageCircle } from "lucide-react"

// interface ForumPost {
//   id: number
//   content: string
//   author: string
//   upvotes: number
//   downvotes: number
//   isQuestion: boolean
//   answers: ForumPost[]
// }

// interface LessonForumProps {
//   lessonId: string
//   initialPosts: ForumPost[]
// }

// export default function LessonForum({ lessonId, initialPosts = [] }: LessonForumProps) {
//   const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
//   const [newQuestionContent, setNewQuestionContent] = useState('')
//   const [newAnswerContent, setNewAnswerContent] = useState<{ [key: number]: string }>({})

//   const addQuestion = () => {
//     if (newQuestionContent.trim()) {
//       const newQuestion: ForumPost = {
//         id: Date.now(),
//         content: newQuestionContent,
//         author: 'Current Student',
//         upvotes: 0,
//         downvotes: 0,
//         isQuestion: true,
//         answers: []
//       }
//       setPosts([newQuestion, ...posts])
//       setNewQuestionContent('')
//     }
//   }

//   const addAnswer = (questionId: number) => {
//     const answerContent = newAnswerContent[questionId]
//     if (answerContent && answerContent.trim()) {
//       setPosts(posts.map(post => 
//         post.id === questionId
//           ? {
//               ...post,
//               answers: [
//                 ...post.answers,
//                 {
//                   id: Date.now(),
//                   content: answerContent,
//                   author: 'Current Student',
//                   upvotes: 0,
//                   downvotes: 0,
//                   isQuestion: false,
//                   answers: []
//                 }
//               ]
//             }
//           : post
//       ))
//       setNewAnswerContent({ ...newAnswerContent, [questionId]: '' })
//     }
//   }

//   const votePost = (postId: number, isUpvote: boolean, isAnswer = false, questionId?: number) => {
//     if (isAnswer && questionId) {
//       setPosts(posts.map(post => 
//         post.id === questionId
//           ? {
//               ...post,
//               answers: post.answers.map(answer => 
//                 answer.id === postId
//                   ? { 
//                       ...answer, 
//                       upvotes: isUpvote ? answer.upvotes + 1 : answer.upvotes,
//                       downvotes: !isUpvote ? answer.downvotes + 1 : answer.downvotes
//                     }
//                   : answer
//               )
//             }
//           : post
//       ))
//     } else {
//       setPosts(posts.map(post =>
//         post.id === postId 
//           ? { 
//               ...post, 
//               upvotes: isUpvote ? post.upvotes + 1 : post.upvotes,
//               downvotes: !isUpvote ? post.downvotes + 1 : post.downvotes
//             } 
//           : post
//       ))
//     }
//   }

//   return (
//     <div className="w-full  mx-auto p-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Next.js SSR Lesson Discussion</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Textarea
//             placeholder="Ask a question about Next.js SSR..."
//             value={newQuestionContent}
//             onChange={(e) => setNewQuestionContent(e.target.value)}
//             className="mb-2"
//           />
//           <Button onClick={addQuestion}>Post Question</Button>
//         </CardContent>
//       </Card>

//       {posts.map(post => (
//         <Card key={post.id} className="mb-4">
//           <CardContent className="pt-6">
//             <div className="flex items-start space-x-4 mb-4">
//               <div className="flex flex-col items-center space-y-1">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="w-8 h-8 rounded-full"
//                   onClick={() => votePost(post.id, true)}
//                   aria-label={`Upvote question by ${post.author}`}
//                 >
//                   <ChevronUp className="h-4 w-4" />
//                 </Button>
//                 <span className="text-xs font-medium">{post.upvotes}</span>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="w-8 h-8 rounded-full"
//                   onClick={() => votePost(post.id, false)}
//                   aria-label={`Downvote question by ${post.author}`}
//                 >
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//                 <span className="text-xs font-medium">{post.downvotes}</span>
//               </div>
//               <div className="flex-grow">
//                 <p className="text-sm text-muted-foreground mb-1">{post.author}</p>
//                 <p className="text-base">{post.content}</p>
//               </div>
//             </div>

//             {post.answers.map(answer => (
//               <Card key={answer.id} className="mb-2 ml-8">
//                 <CardContent className="py-4 flex items-start space-x-4">
//                   <div className="flex flex-col items-center space-y-1">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="w-6 h-6 rounded-full"
//                       onClick={() => votePost(answer.id, true, true, post.id)}
//                       aria-label={`Upvote answer by ${answer.author}`}
//                     >
//                       <ChevronUp className="h-3 w-3" />
//                     </Button>
//                     <span className="text-xs font-medium">{answer.upvotes}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="w-6 h-6 rounded-full"
//                       onClick={() => votePost(answer.id, false, true, post.id)}
//                       aria-label={`Downvote answer by ${answer.author}`}
//                     >
//                       <ChevronDown className="h-3 w-3" />
//                     </Button>
//                     <span className="text-xs font-medium">{answer.downvotes}</span>
//                   </div>
//                   <div className="flex-grow">
//                     <p className="text-sm text-muted-foreground mb-1">{answer.author}</p>
//                     <p className="text-sm">{answer.content}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}

//             <div className="mt-2 ml-8">
//               <Input
//                 type="text"
//                 placeholder="Write an answer..."
//                 value={newAnswerContent[post.id] || ''}
//                 onChange={(e) => setNewAnswerContent({ ...newAnswerContent, [post.id]: e.target.value })}
//                 className="mb-2"
//               />
//               <Button onClick={() => addAnswer(post.id)} size="sm">
//                 <MessageCircle className="h-4 w-4 mr-2" />
//                 Answer
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUp, ChevronDown, MessageCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useToast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from 'date-fns'

interface ForumPost {
  id: string
  content: string
  author: {
    name: string
    image: string
  }
  upvotes: number
  downvotes: number
  isQuestion: boolean
  answers: ForumPost[]
  userVote?: 'UPVOTE' | 'DOWNVOTE' | null
  createdAt: string
}

interface LessonForumProps {
  lessonId: string
}

export default function LessonForum({ lessonId }: LessonForumProps) {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [newQuestionContent, setNewQuestionContent] = useState('')
  const [newAnswerContent, setNewAnswerContent] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'votes'>('votes')

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/posts`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(sortPosts(data, sortBy))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      })
    }
  }

  const sortPosts = (postsToSort: ForumPost[], sortType: 'newest' | 'votes') => {
    return [...postsToSort].sort((a, b) => {
      if (sortType === 'votes') {
        const aScore = a.upvotes - a.downvotes
        const bScore = b.upvotes - b.downvotes
        return bScore - aScore
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [lessonId])

  useEffect(() => {
    setPosts(sortPosts(posts, sortBy))
  }, [sortBy])

  const addQuestion = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post questions",
        variant: "destructive",
      })
      return
    }

    if (newQuestionContent.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/lessons/${lessonId}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newQuestionContent }),
        })
        
        if (!response.ok) throw new Error('Failed to post question')
        
        await fetchPosts()
        setNewQuestionContent('')
        toast({
          title: "Success",
          description: "Question posted successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to post question",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const addAnswer = async (postId: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post answers",
        variant: "destructive",
      })
      return
    }

    const answerContent = newAnswerContent[postId]
    if (answerContent?.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/posts/${postId}/answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: answerContent }),
        })
        
        if (!response.ok) throw new Error('Failed to post answer')
        
        await fetchPosts()
        setNewAnswerContent({ ...newAnswerContent, [postId]: '' })
        toast({
          title: "Success",
          description: "Answer posted successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to post answer",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleVote = async (postId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to vote",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}/vote/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: voteType }),
      })
      
      if (!response.ok) throw new Error('Failed to vote')
      
      const { upvotes, downvotes } = await response.json()
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId
            ? { 
                ...post, 
                upvotes, 
                downvotes,
                userVote: voteType === post.userVote ? null : voteType
              }
            : {
                ...post,
                answers: post.answers.map(answer =>
                  answer.id === postId
                    ? { 
                        ...answer, 
                        upvotes, 
                        downvotes,
                        userVote: voteType === answer.userVote ? null : voteType
                      }
                    : answer
                )
              }
        )
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process vote",
        variant: "destructive",
      })
    }
  }

  const renderPost = (post: ForumPost, isAnswer = false) => (
    <div className={`flex items-start space-x-4 ${isAnswer ? 'ml-8 mt-4' : ''}`}>
      <div className="flex flex-col items-center space-y-1">
        <Button
          variant={post.userVote === 'UPVOTE' ? 'default' : 'outline'}
          size="icon"
          className={`rounded-full ${isAnswer ? 'w-6 h-6' : 'w-8 h-8'}`}
          onClick={() => handleVote(post.id, 'UPVOTE')}
          disabled={isLoading || !session}
        >
          <ChevronUp className={isAnswer ? 'h-3 w-3' : 'h-4 w-4'} />
        </Button>
        <span className="text-xs font-medium">{post.upvotes - post.downvotes}</span>
        <Button
          variant={post.userVote === 'DOWNVOTE' ? 'default' : 'outline'}
          size="icon"
          className={`rounded-full ${isAnswer ? 'w-6 h-6' : 'w-8 h-8'}`}
          onClick={() => handleVote(post.id, 'DOWNVOTE')}
          disabled={isLoading || !session}
        >
          <ChevronDown className={isAnswer ? 'h-3 w-3' : 'h-4 w-4'} />
        </Button>
      </div>

      <div className="flex-grow">
        <div className="flex items-center space-x-2 mb-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-base mb-4">{post.content}</p>
      </div>
    </div>
  )

  return (
    <div className="w-full mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Discussion</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={sortBy === 'votes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('votes')}
              >
                Top
              </Button>
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('newest')}
              >
                Newest
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={session ? "Ask a question..." : "Sign in to ask a question"}
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
            className="mb-2"
            disabled={isLoading || !session}
          />
          <Button 
            onClick={addQuestion} 
            disabled={isLoading || !session}
          >
            Post Question
          </Button>
        </CardContent>
      </Card>

      {posts.map(post => (
        <Card key={post.id} className="mb-4">
          <CardContent className="pt-6">
            {renderPost(post)}

            {post.answers.map(answer => (
              <Card key={answer.id} className="mb-2">
                <CardContent className="py-4">
                  {renderPost(answer, true)}
                </CardContent>
              </Card>
            ))}

            <div className="mt-4 ml-12">
              <Input
                placeholder={session ? "Write an answer..." : "Sign in to answer"}
                value={newAnswerContent[post.id] || ''}
                onChange={(e) => setNewAnswerContent({ 
                  ...newAnswerContent, 
                  [post.id]: e.target.value 
                })}
                className="mb-2"
                disabled={isLoading || !session}
              />
              <Button 
                onClick={() => addAnswer(post.id)}
                size="sm"
                disabled={isLoading || !session}
              >
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