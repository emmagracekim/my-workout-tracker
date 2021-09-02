import { React, useState, useRef, useEffect, useContext } from "react"
import { useAuth } from "./Data/authProvider"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { GiWeightLiftingUp } from "react-icons/gi"
import { HomeRounded, TodayRounded } from "@material-ui/icons"
import { Transition } from "@headlessui/react"
import { useRouter } from "next/dist/client/router"
import { Router } from "react-router"

const Nav = ({ handleDateChange, selectedDate, highlightDates }) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function openDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  const wrapperRef = useRef(null)

  const { user, logout } = useAuth()

  const router = useRouter()

  //   const history = useHistory()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [wrapperRef])

  return (
    user && (
      <nav className="">
        <div>
          <div>
            <div>
              <div
                className=""
                onClick={() => {
                  router.push("/home")
                }}
              >
                <GiWeightLiftingUp />
              </div>

              <div className="md:block">
                <div className="">
                  <a
                    href="/#"
                    aria-label="Home"
                    onClick={() => {
                      router.push("/home")
                    }}
                  >
                    <HomeRounded aria-label="Home" />
                  </a>

                  <ReactDatePicker
                    aria-label="Calendar"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    highlightDates={highlightDates}
                    name="startDate"
                    dateFormat="MMM dd, yyyy"
                    closeOnScroll={true}
                    withPortal
                    customInput={
                      <div className="">
                        <TodayRounded />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="md:block">
              <div className="">
                <div className="" ref={wrapperRef}>
                  <div>
                    <button
                      aria-label="profile menu"
                      className=""
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setProfileOpen(!profileOpen)}
                      onKeyDown={() => setProfileOpen(!profileOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      {user.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.photoURL}
                          alt="User profile"
                        />
                      ) : (
                        <img
                          src="/whitepng.png"
                          className="h-8 w-8 rounded-full object-cover"
                          alt="default profile"
                        />
                      )}
                    </button>
                  </div>
                  <Transition
                    show={profileOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div
                      className=""
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="/#"
                        className=""
                        role="menuitem"
                        tabIndex="0"
                        onClick={() => router.push("/profile")}
                      >
                        Profile
                      </a>

                      <a
                        href="/#"
                        className=""
                        role="menuitem"
                        tabIndex="0"
                        onClick={logout}
                      >
                        Sign out
                      </a>
                      <a
                        href="/#"
                        className=""
                        role="menuitem"
                        tabIndex="0"
                        onClick={openDeleteModal}
                      >
                        Delete account
                      </a>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  )
}

export default Nav
