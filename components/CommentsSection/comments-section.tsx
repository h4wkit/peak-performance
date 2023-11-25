"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Comment as CommentType } from "@/types/types"

import { Skeleton } from "../ui/skeleton"
import Comment from "./comment"
import { InsertCommentForm } from "./insert-comment-form"

function CommentsSection({ articleId }: { articleId: string }) {
    const supabase = createClientComponentClient()
    const [comments, setComments] = useState<any | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<any | null>(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()

                if (error) {
                    console.log(error)
                }

                if (data?.user) {
                    setCurrentUser(data.user)
                } else {
                    // Handle case where the token is not available or expired
                    // You might want to redirect the user to the login page or refresh the token
                    console.log("User not authenticated or token expired")
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getComments = async () => {
            try {
                const { data, error } = await supabase
                    .from("comments")
                    .select()
                    .eq("slug", articleId)
                    .order("created_at")

                if (error) {
                    console.error(error)
                    setComments("error")
                } else {
                    setComments(data)
                    console.log(data)
                }

                setLoading(false)
            } catch (error) {
                console.error(error)
                setComments("error")
                setLoading(false)
            }
        }

        getComments()
        getUser()
    }, [articleId, supabase])

    return (
        <section
            className="flex w-full max-w-[1500px] flex-col justify-center space-y-6 border-y px-5 py-8"
            id="comments"
        >
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-blue-500">
                    Leave a Comment
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Share your thoughts about this article.
                </p>
            </div>
            <section className="lg:justify-left  flex flex-col items-center space-x-0 space-y-10 lg:flex-row lg:items-start lg:space-x-10 lg:space-y-0">
                <section className="flex w-full flex-col  items-center lg:items-start lg:justify-start">
                    <InsertCommentForm
                        articleId={articleId}
                        currentUser={currentUser}
                    />

                    {isLoading ? (
                        Array.from({ length: 4 }, (value, index) => (
                            <article
                                className="flex max-w-[500px] flex-wrap"
                                key={index}
                            >
                                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                            </article>
                        ))
                    ) : (
                        <div className="w-full">
                            {comments === "error" ? (
                                <p>Error fetching comments</p>
                            ) : (
                                <div className="w-full  space-y-6">
                                    {comments.length > 0 ? (
                                        comments.map((comment: CommentType) => (
                                            <Comment
                                                comment={comment}
                                                currentUser={currentUser}
                                                key={comment.id}
                                            />
                                        ))
                                    ) : (
                                        <div>ther is not comments</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </section>
        </section>
    )
}

export default CommentsSection
