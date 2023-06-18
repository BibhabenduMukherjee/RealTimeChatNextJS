import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
interface PageProps {

}


const page = async({})=>{
    const session = await getServerSession(authOptions)
    if(!session) return notFound();
    // ids of people who sent current logged in user a friend request
    const incomingreq = (await fetchRedis('smembers' , `user:${session.user.id}` ))
    return <div></div>

}

export default page