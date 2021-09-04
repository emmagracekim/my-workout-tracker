import { React, useEffect } from "react"
import { useAuth } from "../components/Data/authProvider"
import { Fragment } from "react"
import Login from "./Login"
import { useRouter } from "next/dist/client/router"

export default function Home() {
  const { user, loading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/home")
    }
  }, [user])

  if (loading) return null

  return (
    <React.Fragment>
      <section>{!user && <Login />}</section>
    </React.Fragment>
  )
}
