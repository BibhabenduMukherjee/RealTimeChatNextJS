import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidate } from "@/lib/validation/add-friend";
import { getServerSession } from "next-auth";
import {z}  from "zod"
export async function POST(req:Request){
try{
    const session = await getServerSession(authOptions)
    if(!session){
        return new Response('Unauthorized' , {status : 404})
    }  

   

    const body = await req.json();
    const {email: emailToAdd } = addFriendValidate.parse(body.email);
    //console.log(emailToAdd);
    if(emailToAdd === session?.user.email){
        return new Response('Cannot not add yourself' , {status : 401})
    }
    const idToAdd = await fetchRedis('get' , `user:email:${emailToAdd}`) as string
    //console.log(idToAdd)
    if(!idToAdd){

        // as status 400 series consider as a AxiosError class
        return new Response('Person does not presnt' , {status : 401})
    }
   
   
    // send the requested user id and current_user to check ismember 
    const isAlreadyExist = ( await fetchRedis('sismember' , `user:${idToAdd}:incoming_friend_requests` , session.user.id) ) 
    if(isAlreadyExist){
        return new Response('Request is already sent' , {status: 400})
    }


    const isAlreadyFriend = ( await fetchRedis('sismember' , `user:${session.user.id}:friends` , idToAdd) ) 
    if(isAlreadyFriend){
        return new Response('This user is Already added as a Friend' , {status: 400})
    }

    db.sadd(`user:${idToAdd}:incoming_friend_requests` , session.user.id)
    return new Response('ok')
     
}catch(err){
    if(err instanceof z.ZodError){
        return new Response('invalid request payload' , {status : 422})
    }
}

return new Response('invalid request' , {status :400})
}