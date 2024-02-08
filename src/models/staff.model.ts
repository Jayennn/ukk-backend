import {z} from "zod";

const staffBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  phone_number: z.string(),
})

export type StaffBody = z.infer<typeof staffBodySchema>;
