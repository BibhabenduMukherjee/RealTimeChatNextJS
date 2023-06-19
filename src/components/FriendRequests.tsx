'use client'
import { Check, UserPlus, X } from "lucide-react"
import {FC, useState} from "react"
interface FriendRequestsProrps{
    incomingFriendRequest:IncomingFriendRequest[]
    sessionId : string
}

const FriendRequests:FC<FriendRequestsProrps> = ({incomingFriendRequest , sessionId})=>{
    const [friendRequests , setFriendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequest
    )
    return (
        <>
        {friendRequests.length === 0 ? (<>
        <p className="text-sm text-zinc-600 "> No Friend Requests</p>
        </>) : (<>
       {friendRequests.map((r)=>(
        <div key={r.senderId} className="ml-4 flex space-x-2 gap-4 items-center">
            <UserPlus className="text-black"/>
            <p className="font-medium text-lg">{r.senderEmail}</p>
            <button aria-label="accept friend request" 
            className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
            ><Check className="font-semibold text-white w-3/4 h-3/4"/></button>

            <button aria-label="accept friend request" 
            className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            ><X className="font-semibold text-white w-3/4 h-3/4"/></button>

        </div>
       ))}
        </>)}
        </>
       
    )
}

export default FriendRequests