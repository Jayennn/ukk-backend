import {z} from "zod";


const authorBodySchema = z.object({
  author_name: z.string(),
  phone_number: z.string(),
  address: z.string(),
})

export type AuthorBody = z.infer<typeof authorBodySchema>;
