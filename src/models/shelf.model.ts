import {z} from "zod";


const shelfBodySchema = z.object({
  shelf_code: z.string()
})

export type ShelfBody = z.infer<typeof shelfBodySchema>;
