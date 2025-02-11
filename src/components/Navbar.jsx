import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, Menu, X, LogOut, Search, PlusCircle, CheckCircle, Package, InfoIcon } from "lucide-react"
import { Tooltip } from "react-tooltip"
import useAuthContext from "../hooks/useAuthContext"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logOut } = useAuthContext()
  const location = useLocation()
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const navLinks = [
    { to: "/", label: "Home", icon: null },
    { to: "/lost-found", label: "Lost & Found Items", icon: Search },
    { to: "/recovered", label: "Recovered Items", icon: CheckCircle },
    { to: "/about", label: "About Us", icon: InfoIcon },
  ]

  const profileLinks = [
    { to: "/add-item", label: "Add Lost & Found Item", icon: PlusCircle },
    { to: "/my-items", label: "Manage My Items", icon: Package },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-light-background dark:bg-dark-background border-b border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary-light transition-colors flex items-center gap-2"
            >
              <Search className="h-6 w-6" />
              WhereIsIt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-light-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2 py-2"
              >
                {link.icon && <link.icon size={18} />}
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="activeLink"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-light-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-primary-light rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              /* Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none"
                  aria-label="Open profile menu"
                >
                  <img
                    src={user?.photoURL || "/placeholder.svg"}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                    data-tooltip-id="profile-tooltip"
                    data-tooltip-content={user?.displayName}
                  />
                </button>
                <Tooltip
                  id="profile-tooltip"
                  place="bottom"
                  className="bg-light-card dark:bg-dark-card text-light-foreground dark:text-dark-foreground px-2 py-1 text-sm rounded shadow-lg"
                />

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card rounded-md shadow-lg py-1 border border-light-border dark:border-dark-border"
                    >
                      {profileLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center px-4 py-2 text-sm text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {link.icon && <link.icon size={16} className="mr-2" />}
                          {link.label}
                        </Link>
                      ))}
                      <button
                        onClick={logOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-light-foreground dark:text-dark-foreground hover:text-primary dark:hover:text-primary-light rounded-full transition-colors"
                aria-label="Open main menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary text-white"
                        : "text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon && <link.icon size={18} className="mr-2" />}
                    {link.label}
                  </Link>
                ))}
                {user &&
                  profileLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center px-4 py-2 text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon && <link.icon size={18} className="mr-2" />}
                      {link.label}
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

