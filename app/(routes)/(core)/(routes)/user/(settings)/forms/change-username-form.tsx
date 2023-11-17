"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle, Loader2 } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Database } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    username: z
        .string()
        .min(1, "Username can not be empty.")
        .min(5, "Username must have at least 5 characters."),
})

function ChangeUsernameForm() {
    const supabase = createClientComponentClient<Database>()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })
    const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        const { data: _, error } = await supabase
            .from("profiles")
            .update({
                username: formData.username,
            })
            .eq("id", user!.id)
        if (error) {
            setError("username", { message: error.message })
            return
        }

        window.location.reload()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-3"
        >
            <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                    <Input
                        id="username"
                        type="username"
                        placeholder="Enter new username"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        disabled={isSubmitting}
                        {...register("username")}
                        className={`${
                            errors.username ? "border border-red-500 pr-10" : ""
                        }`}
                    />
                    {errors.username && (
                        <div className="-translate-y-2/5 absolute right-3 top-1/4 text-red-500">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AlertCircle size={18} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{errors.username.message}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>
            </div>

            <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <p className="px-5">UPDATE USERNAME</p>
            </Button>
        </form>
    )
}
export default ChangeUsernameForm