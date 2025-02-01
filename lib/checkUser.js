


import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma"

export const checkUser = async ()=>{
    const user  = await currentUser()
    if(!user){
        return null
    }
    try {
       const loogedInUser =  await db.user.findUnique({
            where:{
                clerkUserId:user.id,
            }
        })
        if(loogedInUser){
            return loogedInUser
        }
        const name = `${user.firstName} ${user.lastName}`

        const newUser = await db.user.create({
            data:{
                clerkUserId:user.id,
                name,
                imageURL:user.imageUrl,
                email:user.emailAddresses[0].emailAddress,
            }
        })

        return newUser
    } catch (error) {
        console.log(error.message)
    }
}