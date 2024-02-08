import {prisma} from "../../prisma/prisma-client";


export const findUsers = async(username: string) => {
  const student = await prisma.student.findUnique({
    where: {
      username
    }
  })

  if(student) return student

  const staff = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      staff: true
    }
  })
  // const staff = await prisma.$queryRaw`SELECT tb_user.id, tb_user.role, tb_user.username, tb_user.password, staff.id, staff.name, staff.address, staff.phone_number FROM public.user tb_user RIGHT JOIN staff ON tb_user.staff_id = staff.id WHERE (tb_user.username = ${username} AND 1=1) LIMIT 1 OFFSET 0`



  if(staff) return {
    id: staff.id,
    role: staff.role,
    username: staff.username,
    password: staff.password,
    name: staff.staff!.name,
    ...staff.staff
  }

}
