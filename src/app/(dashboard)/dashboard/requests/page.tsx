import AddFriendButton from "@/components/AddFriendButton";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
interface PageProps {

}
interface User {
    name  : string,
    email : string,
    image : string,
    id: string
}


const page = async({})=>{
    const session = await getServerSession(authOptions)
   // console.log(typeof(session?.user))
    if(!session) return notFound();
    // ids of people who sent current logged in user a friend request
    const incomingreq = (await fetchRedis('smembers' , `user:${session.user.id}:incoming_friend_requests` ))   
    const incomingfriendreqemail = await Promise.all(
        new Array(incomingreq).map(async (senderId) =>{
         const senderInfo = (await fetchRedis('get',`user:${senderId}`) ) as string
         const senderParsed = JSON.parse(senderInfo)
       // console.log(senderInfo)
         return {
            senderId,
            senderEmail: senderParsed?.email,
         }
        })
    )
 //console.log(incomingfriendreqemail);
    
    return <main className="pt-8">
     <h1 className="font-bold text-4xl ml-4 mb-8">Incoming Request</h1>
     <div className="flex flex-col gap-4">
        <FriendRequests incomingFriendRequest = {incomingfriendreqemail} sessionId= {session.user.id}/>
     </div>
    </main>

}

export default page