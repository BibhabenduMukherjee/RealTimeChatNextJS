import React from 'react'
import { FC } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const page = async ({})=>{
  const session = await getServerSession(authOptions)
  return <pre>{JSON.stringify(session)}</pre>
}

export default page