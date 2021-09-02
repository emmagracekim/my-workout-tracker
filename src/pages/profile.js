import { React, useState, useEffect } from "react"
import NavBar from "../components/NavBar"

const Profile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Profile
