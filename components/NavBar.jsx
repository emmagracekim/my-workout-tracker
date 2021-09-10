import { React, useState, useRef, useEffect, useContext } from "react"
import { useAuth } from "./Data/authProvider"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { GiWeightLiftingUp } from "react-icons/gi"
import { HomeRounded, TodayRounded } from "@material-ui/icons"
import { Transition } from "@headlessui/react"
import { useRouter } from "next/router"

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
      <nav className="transition bg-white shadow-bottom ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => {
                  router.push("/home")
                }}
              >
                <GiWeightLiftingUp />
              </div>

              <div className="md:block">
                <div className="ml-8 flex items-baseline space-x-4">
                  <a
                    href="#"
                    aria-label="Home"
                    onClick={() => {
                      router.push("/home")
                    }}
                  >
                    <HomeRounded aria-label="Home" />
                  </a>

                  <DatePicker
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
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-6 relative" ref={wrapperRef}>
                  <div>
                    <button
                      aria-label="profile menu"
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                      className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 text-gray-700 bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-blue-200"
                        role="menuitem"
                        tabIndex="0"
                        onClick={() => router.push("/profile")}
                      >
                        Profile
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-2 text-sm  hover:bg-blue-200"
                        role="menuitem"
                        tabIndex="0"
                        onClick={logout}
                      >
                        Sign out
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm  hover:bg-blue-200"
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
