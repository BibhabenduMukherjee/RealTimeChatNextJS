import {z} from "zod"

export const addFriendValidate = z.object({
    email : z.string().email(),
})

