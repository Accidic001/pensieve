"use client"
import { useSession } from "next-auth/react"

export default function Profile() {
  const {data:session} = useSession();
  return (
    <div>
      {
        session?.user ? <div>from client: signin</div>:<div>from client: not signin</div>
      }
    </div>
  )
}