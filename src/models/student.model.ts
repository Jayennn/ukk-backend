import {z} from "zod";


const studentBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  phone_number: z.string(),
  gender: z.enum(["male", "female"]),
  username: z.string(),
  password: z.string(),
})


export type StudentBody = z.infer<typeof studentBodySchema>;
