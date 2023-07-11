import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req:Request){
      try{

        const {text,chatId}  : {text:string , chatId:string} = 
          await req.json();
          const session = await getServerSession(authOptions);
          if(!session) return new Response('Unauthorized' , {status: 401})
      }
      catch(err){}
}