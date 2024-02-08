import {z} from "zod";

const bookBodySchema = z.object({
  book_title: z.string(),
  category_id: z.number(),
  release_date: z.string(),
  author_id: z.array(z.number()),
  shelf_id: z.number()
})

export type BookBody = z.infer<typeof bookBodySchema>;
