import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"
import { fetchRedis } from "@/helper/redis";

function getGoogleCredentials(){
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLENT_SECRET
    if(!clientId || clientId.length === 0){
        throw new Error("Missing Google Id ")
    }
    if(!clientSecret || clientSecret.length === 0){
        throw new Error("Missing Google Secret")
    }

    return {clientId,clientSecret}
}
export const authOptions:NextAuthOptions = {

    // the adapter option is used to specify a database adapter to use for 
    //storing user data. A database adapter is responsible for handling the 
    //communication between NextAuth.js and the database where the user data is stored.
    adapter : UpstashRedisAdapter(db),
    session : {
        strategy : 'jwt'
    },
    pages : {
        signIn : "/login"
    },
    providers : [
        GoogleProvider({
            clientId : getGoogleCredentials().clientId,
            clientSecret : getGoogleCredentials().clientSecret
        })
    ],
    callbacks : {

        // call immediately after the `JWT` token 
        // created by nextAuth set the token.id = to user.id
        // otherwise set `id`,`name`,`email`,`picture`
        // comes from the DB
        async jwt ({token, user}){
            const dbUserRes = await fetchRedis('get' , `user:${token.id}` ) as string | null
            if(!dbUserRes){

                if(user){
                token.id = user.id
                }return token
            }

            const dbUser = JSON.parse(dbUserRes) as User
            return {
                id : dbUser.id,
                name : dbUser.name,
                email : dbUser.email,
                picture : dbUser.image
            }
        }
        ,
    async session({session,token}){
        if(token){
            session.user.id = token.id
            session.user.name = token.name,
            session.user.email = token.email
            session.user.image = token.picture
        }
        return session
    },
    redirect(){
        return "/dashboard"
    }
    }

}