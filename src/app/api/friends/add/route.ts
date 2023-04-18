import { addFriendValidate } from "@/lib/validation/add-friend";

export async function POST(req:Request){
try{
    const body = await req.json();
    const {email: emailToAdd } = addFriendValidate.parse(body.email);


}catch(err){}
}