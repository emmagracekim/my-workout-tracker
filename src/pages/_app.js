import "../styles/globals.css"
import { AuthProvider } from "../components/Data/authProvider"
import Head from "next/head"
import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "../config/theme"
import { Windmill } from "@windmill/react-ui"

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Fit4Life Workout Tracker</title>
        <meta name="Description" content="This is the home page of my site" />
        <meta name="image" property="og:image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>
      <AuthProvider>
        <Windmill usePreferences theme={theme}>
          <Component {...pageProps} />
        </Windmill>
      </AuthProvider>
    </React.Fragment>
  )
}

export default MyApp
