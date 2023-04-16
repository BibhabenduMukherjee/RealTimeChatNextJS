

import {FC, ReactNode} from "react"

import AddFriendsButton from "../../../../components/AddFriendButton"
const page:FC = ()=>{
    return (
        <main className="pt-8">
           <h1 className="font-bold text-5xl mb-8">Add Friends</h1>
           <AddFriendsButton/>
        </main>
    )
}

export default page