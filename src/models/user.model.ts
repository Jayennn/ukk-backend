import {z} from "zod";


const userBodySchema = z.object({
  staff_id: z.number(),
  student_id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["admin", "operator"]),
})

export type UserBody = z.infer<typeof userBodySchema>;
