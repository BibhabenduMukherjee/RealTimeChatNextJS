import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

import { ReactNode } from "react";
interface LayoutProps{
    children: ReactNode
}

const Layout = async({children} : LayoutProps)=>{
    await getServerSession(authOptions)
    return <div>{children}</div>
}