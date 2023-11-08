"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { Exercise } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function ExercisesRender({ offset = 0 }: { offset: number }) {
    const [exercises, setExercises] = useState<Exercise[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true) // Add a loading state

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search)

                const skillLevel = searchParams.get("skill_level")
                const exerciseType = searchParams.get("exercise_type")
                const muscle = searchParams.get("muscle")

                const response = await axios.get("/api/exercises", {
                    params: {
                        skill_level: skillLevel,
                        exercise_type: exerciseType,
                        muscle: muscle,
                        offset: offset,
                    },
                })

                if (response.status === 200) {
                    setExercises(response.data)
                } else {
                    setError("Something went wrong.")
                }
            } catch (error) {
                setError("An error occurred while fetching data.")
            } finally {
                setIsLoading(false) // Set loading state to false when data is available
            }
        }

        fetchExercises()
    }, [])

    return (
        <>
            {error && <div>{error}</div>}
            {exercises && exercises.length === 0 && (
                <div>No exercises found.</div>
            )}
            {isLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className=" m-3 mx-auto h-[475px] w-full max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl"
                    ></Skeleton>
                ))}

            {exercises && exercises.length > 0 && (
                <>
                    {exercises.map((exercise, index) => (
                        <Card
                            className="m-3 mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl"
                            key={index}
                        >
                            <div className="p-8">
                                <CardTitle className="mt-1 block text-4xl font-medium leading-tight text-black">
                                    {exercise.name}
                                </CardTitle>
                                {/* <CardDescription className="mt-2 text-gray-500">
                                        Start your day with a refreshing morning
                                        workout.
                                    </CardDescription> */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-700">
                                        Muscles targeted:{" "}
                                        <span className="font-semibold">
                                            {exercise.muscle}
                                        </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Equipment needed:{" "}
                                        <span className="font-semibold">
                                            {exercise.equipment}
                                        </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Type:{" "}
                                        <span className="font-semibold">
                                            {exercise.type}
                                        </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Difficulty:{" "}
                                        <span className="font-semibold">
                                            {exercise.difficulty}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <CardTitle className="mt-1 block text-lg font-medium leading-tight text-black">
                                        Exercise Instructions
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-gray-500">
                                        Follow these instructions to perform the
                                        exercise correctly:
                                    </CardDescription>

                                    <p>
                                        {exercise.instructions
                                            ? exercise.instructions
                                            : "No instructions added"}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        className="text-blue-600 hover:text-blue-900"
                                        variant="outline"
                                    >
                                        Add to my workout
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </>
            )}
        </>
    )
}
export default ExercisesRender