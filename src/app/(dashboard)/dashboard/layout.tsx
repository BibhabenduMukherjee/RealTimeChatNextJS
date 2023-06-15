import { Icons } from "@/components/icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

import { ReactNode } from "react";
interface LayoutProps{
    children: ReactNode
}

const Layout = async({children} : LayoutProps)=>{
    // before reaching to the dashboard 
    // check for a valid session
   const session =  await getServerSession(authOptions)
   if(!session) notFound()

    return <div className="w-full flex h-screen">
        <div className = 'flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border border-gray-200 bg-white px-6'></div>
        <Link href="/dashboard" className = 'flex h-16 shrink-0 items-center'></Link>
        <Icons.Logo className ='h-8 w-8 text-indigo-700' />
        {children}</div>
}

export default Layout