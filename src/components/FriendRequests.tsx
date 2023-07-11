'use client'
import axios from "axios"
import { Check, UserPlus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import {FC, useState} from "react"
interface FriendRequestsProrps{
    incomingFriendRequest:IncomingFriendRequest[]
    sessionId : string
}

const FriendRequests:FC<FriendRequestsProrps> = ({incomingFriendRequest , sessionId})=>{
    const router = useRouter();
    const [friendRequests , setFriendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequest
    )
    // if we have 3 friend request  a,b,c and we accept
    // b then we need to take out b from state
    const acceptFriend = async (senderId:string) =>{
        await axios.post('/api/friends/accept' , {id : senderId})
        setFriendRequests((prev)=>
            prev.filter((request)=> request.senderId !== senderId)
        )
        router.refresh();
        


    }

    const denyFriend = async (senderId:string) =>{
        await axios.post('/api/friends/deny' , {id : senderId})
        setFriendRequests((prev)=>
            prev.filter((request)=> request.senderId !== senderId)
        )
        router.refresh();


    }

    return (
        <>
        {friendRequests.length === 0 ? (<>
        <p className="text-sm text-zinc-600 "> No Friend Requests</p>
        </>) : (<>
       {friendRequests.map((r)=>(
        <div key={r.senderId} className="ml-4 flex space-x-2 gap-4 items-center">
            <UserPlus className="text-black"/>
            <p className="font-medium text-lg">{r.senderEmail}</p>
            <button aria-label="accept friend request"  onClick={()=>{acceptFriend(r.senderId)}}
            className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
            ><Check className="font-semibold text-white w-3/4 h-3/4"/></button>

            <button onClick={()=> denyFriend(r.senderId)} aria-label="accept friend request" 
            className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            ><X className="font-semibold text-white w-3/4 h-3/4"/></button>
 
        </div>
       ))}
        </>)}
        </>
       
    )
}

export default FriendRequests