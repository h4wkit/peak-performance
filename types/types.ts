export interface Comment {
    id: string
    user_id: string
    created_at: string
    comment: string
    slug: string
}

export interface Exercise {
    name: string
    type: string
    muscle: string
    equipment: string
    difficulty: string
    instructions: string
}
