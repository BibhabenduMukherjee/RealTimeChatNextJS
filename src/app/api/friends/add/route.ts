import { authOptions } from "@/lib/auth";
import { addFriendValidate } from "@/lib/validation/add-friend";
import { getServerSession } from "next-auth";

export async function POST(req:Request){
try{
    const body = await req.json();
    const {email: emailToAdd } = addFriendValidate.parse(body.email);
    const RESTRespose = await fetch(`
    ${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}` , {
        headers : {
            Authorization : `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
        },
        cache : 'no-store'
    })
    const data =await RESTRespose.json() as {result:string};
    const idToAdd = data.result;
    if(!idToAdd){
        return new Response('Person does not presnt' , {status : 401})
    }
    const session = await getServerSession(authOptions)
    if(idToAdd === session?.user.id){
        return new Response('Cannot not add' , {status : 401})
    }
   
    if(!session){
        return new Response('Unauthorized' , {status : 404})
    }    
}catch(err){}
}