import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validation/messageArrayValidator";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
// this is a dynamic routes 
interface PageProps{
    params:{
        chatId:string
    }
}


async function getChatMessages(chatId: string) {
    try {
      const results= await fetchRedis(
        'zrange',
        `chat:${chatId}:messages`,
        0,
        -1
      )
  
      const dbMessages = new Array(results).map((message) => JSON.parse(message) as Message)
      
      // reversing the message for showing it up according to 
      // latest timestamp
      const reversedDbMessages = dbMessages.reverse()
  
      const messages = messageArrayValidator.parse(reversedDbMessages)
  
      return messages
    } catch (error) {
      notFound()
    }
  }

const page = async({params} : PageProps) =>{
    const {chatId} =  params;
    const session  = await getServerSession(authOptions)
    if(!session) notFound();
    const {user} = session
    const [userId1,userId2 ] = chatId.split("--")
    if (user.id !== userId1 && user.id !== userId2) {
        notFound()
      }
    
    const chatPartnerId = user.id===userId1 ? userId2 : userId1
    const chatPartnerRaw = (await fetchRedis(
        'get',
        `user:${chatPartnerId}`
      )) as string
      const chatPartner = JSON.parse(chatPartnerRaw) as User
      const initialMessages = await getChatMessages(chatId)
return (<>

    <div className=""></div>

</>)
}