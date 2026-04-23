import { useEffect, useState, useRef } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import useOnClickOutside from "../../hooks/useOnClickOutside"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  const mobileMenuRef = useRef(null)

  // Close the mobile menu if clicking outside of it
  useOnClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false))

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMobileCatalogOpen(false)
  }, [location.pathname])

  return (
    <div
      className={`flex h-[72px] items-center justify-center sticky top-0 z-[1000] ${location.pathname !== "/" ? "bg-richblack-800/80 backdrop-blur-xl" : "bg-richblack-900/80 backdrop-blur-xl"
        } transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border-b border-richblack-700/30`}
    >
      {/* Subtly glowing bottom border line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200/20 to-transparent"></div>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                        ? "text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.5)]"
                        : "text-richblack-25 hover:text-richblack-5 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300"
                        }`}
                    >
                      <p className="font-medium tracking-wide">{link.title}</p>
                      <BsChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-2xl bg-richblack-800/90 backdrop-blur-xl border border-richblack-700 p-4 text-richblack-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-800 border-l border-t border-richblack-700"></div>
                        {loading ? (
                          <p className="text-center text-richblack-300">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-xl bg-transparent py-4 pl-4 hover:bg-richblack-700/50 hover:text-yellow-50 transition-all duration-300"
                                  key={i}
                                >
                                  <p className="font-medium">{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center text-richblack-300">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`font-medium tracking-wide transition-all duration-300 ${matchRoute(link?.path)
                        ? "text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.5)]"
                        : "text-richblack-25 hover:text-richblack-5 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard - Desktop */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-lg border border-richblack-700 bg-richblack-800/50 px-[16px] py-[8px] text-richblack-100 hover:text-white hover:bg-richblack-700 transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-lg border border-transparent bg-yellow-50 px-[16px] py-[8px] text-richblack-900 font-medium hover:bg-yellow-100 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-50/20">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile View Toggles */}
        <div className="flex gap-4 md:hidden items-center">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
          <button
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[72px] left-0 w-full bg-richblack-900/95 backdrop-blur-xl border-b border-richblack-700/50 flex flex-col items-center py-6 md:hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] z-[1000] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="w-full">
            <ul className="flex flex-col items-center gap-y-6 w-full text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="w-full text-center">
                  {link.title === "Catalog" ? (
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={`flex items-center justify-center gap-1 cursor-pointer w-full py-2 ${matchRoute("/catalog/:catalogName") || mobileCatalogOpen
                          ? "text-yellow-50"
                          : "text-richblack-25"
                          }`}
                        onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                      >
                        <p className="font-medium tracking-wide text-lg">{link.title}</p>
                        <BsChevronDown className={`transition-transform duration-300 ${mobileCatalogOpen ? "rotate-180" : ""}`} />
                      </div>

                      {/* Mobile Sublinks */}
                      <div className={`flex flex-col items-center w-full bg-richblack-800/50 overflow-hidden transition-all duration-300 ${mobileCatalogOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"}`}>
                        {loading ? (
                          <p className="text-center text-richblack-300">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <div className="flex flex-col gap-y-3 w-full items-center">
                            {subLinks
                              ?.filter((subLink) => subLink?.courses?.length > 0)
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                  className="text-richblack-100 hover:text-yellow-50"
                                  key={i}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center text-richblack-300">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path} className="block w-full py-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <p
                        className={`font-medium tracking-wide text-lg transition-all duration-300 ${matchRoute(link?.path)
                          ? "text-yellow-50"
                          : "text-richblack-25"
                          }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Login/Signup */}
          {token === null && (
            <div className="flex flex-col gap-y-4 items-center w-full mt-6 px-8">
              <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800/50 px-[16px] py-[12px] text-richblack-100 hover:text-white transition-all duration-300">
                  Log in
                </button>
              </Link>
              <Link to="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full rounded-lg border border-transparent bg-yellow-50 px-[16px] py-[12px] text-richblack-900 font-medium hover:bg-yellow-100 transition-all duration-300">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar