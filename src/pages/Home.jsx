import { react, useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import { withRouter, Route } from "react-router"
import { useHistory } from "react-router"
import { useAuth } from "../components/Data/authProvider"
import "react-datepicker/dist/react-datepicker.css"
import format from "date-fns/format"
import { db } from "../components/Data/firebase"
import React from "react"
import CreateWorkout from "../components/CreateWorkout"
import NavBar from "../components/NavBar"
import history from "../history"

const Home = () => {
  // const history = useHistory()
  const { user } = useAuth()

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
      history.push("/")
    }
  }, [user])

  const DateButton = ({ value }) => <p className="">{value}</p>

  return (
    <React.Fragment>
      <section>
        <div>
          <NavBar
            selectedDate={startDate}
            handleDateChange={handleDateChange}
            highlightDates={uniq.map((date) => new Date(date))}
          />
          <ReactDatePicker
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
