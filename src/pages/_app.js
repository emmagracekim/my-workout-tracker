import "../styles/globals.css"
import React from "react"
import { AuthProvider } from "../components/Data/authProvider"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/styles"
import theme from "../config/theme"
import { Windmill } from "@windmill/react-ui"

function MyApp({ Component, pageProps }) {
  //   const canUseDOM = !!(
  //     typeof window !== "undefined" &&
  //     typeof window.document != "undefined" &&
  //     typeof window.document.createElement != "undefined"
  //   )

  //   const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

  return (
    <React.Fragment>
      <Head>
        <title>Fit4Life Workout Tracker</title>
        <meta name="Description" content="This is the home page of my site" />
        <meta
          name="title"
          property="og:title"
          content="Fit4Life Workout Tracker"
        />
        <meta property="og:type" content="Website" />
        {/* <meta name="image" property="og:image" /> */}
        <meta
          name="description"
          property="og:description"
          content="Fit4Life Workout Tracker"
        />
        <meta name="author" content="Emma Kim" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
