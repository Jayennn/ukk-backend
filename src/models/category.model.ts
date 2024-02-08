import {z} from "zod";

const categoryBodySchema = z.object({
  category_name: z.string()
})

export type CategoryBody = z.infer<typeof categoryBodySchema>;
