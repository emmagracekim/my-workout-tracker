import { React, useEffect } from "react"
import { useAuth } from "../components/Data/authProvider"
import Login from "./Login"
import { useRouter } from "next/router"
import Head from "next/head"

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
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          name="index.js"
          content="index page"
        />
      </Head>
      <section>{!user && <Login />}</section>
    </React.Fragment>
  )
}
