import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import { useAuth } from "../components/Data/authProvider"
import "react-datepicker/dist/react-datepicker.css"
import format from "date-fns/format"
import { db } from "../components/Data/firebase"
import CreateWorkout from "../components/CreateWorkout"
import NavBar from "../components/NavBar"
import Nav from "../components/NavBar"
import { useRouter } from "next/router"
import Head from "next/head"
import React from "react"

const Home = () => {
  // const history = useHistory()
  const { user } = useAuth()
  const router = useRouter()

  const [startDate, setStartDate] = useState(new Date())
  const [exerciseDates, setExerciseDates] = useState([])
  const uniq = [...new Set(exerciseDates)]
  const formattedDate = format(startDate, "p")
  const handleDateChange = (date) => setStartDate(date)

  const getExerciseDates = async () => {
    await db
      .collection("profiles")
      .doc(user.uid)
      .collection("workouts")
      .orderBy("date", "asc")
      .onSnapshot((querySnapshot) => {
        setExerciseDates(querySnapshot.docs.map((doc) => doc.data().date))
      })
  }

  useEffect(() => {
    if (user) {
      getExerciseDates()
    }
    return () => getExerciseDates()
  }, [user])

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user])

  const DateButton = ({ value }) => (
    <p className="z-0 select-none py-1 px-4 w-screen text-center text-white bg-indigo-700 rounded font-medium md:text-lg shadow">
      {value}
    </p>
  )

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          name="home.js"
          content="home page"
        />
      </Head>
      <section>
        <div className="relative min-h-screen w-screen">
          <Nav
            selectedDate={startDate}
            handleDateChange={handleDateChange}
            highlightDates={uniq.map((date) => new Date(date))}
          />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            name="startDate"
            dateFormat="pppp"
            closeOnScroll={true}
            customInput={<DateButton />}
            highlightDates={uniq.map((date) => new Date(date))}
          />
          <CreateWorkout
            selectedDate={formattedDate}
            handleDateChange={handleDateChange}
          />
          {/* <Footer /> */}
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home
