import { z } from 'zod'

export const messageValidator = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.number(),
})

export const messageArrayValidator = z.array(messageValidator)

// inferring the type of current validated message interface
// for latter use 
export type Message = z.infer<typeof messageValidator>
