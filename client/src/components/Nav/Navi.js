import { useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { toast } from "react-toastify";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const solutions = [
  {
    name: "All Books",
    href: "/books",
  },

  {
    name: "Fiction",

    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Non Fiction",

    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Classic Books & Novels",

    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Kids",

    href: "#",
    icon: Squares2X2Icon,
  },
];

const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: LifebuoyIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function Navi() {
  const [searchType,setSearchType] = useState('Books')
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search) {
      window.location.href = `http://localhost:3000/search/${search}`;
    } else {
      toast.error("🦄 Please enter some text!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const { userGlobal, cartGlobal } = useContext(AuthContext);
  const { cart, setCart } = cartGlobal;
  const { authState, setAuthState } = userGlobal;
  const navigate = useNavigate();
  let id = authState.id;
  const enter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleChangeSearch = (e) =>{
    setSearchType(e.target.value)
  }

  return (
    <div className="w-full z-[999]">
      <Popover className="relative bg-white w-full">
        <div className="">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 lg:justify-start lg:space-x-10 px-10">
            <div className="flex justify-start flex-1">
              <a href="/home">
                <span className="f-">Group 100</span>
              </a>
              <Popover.Group
                as="nav"
                className="hidden space-x-10 lg:flex md:hidden ml-5"
              >
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        )}
                      >
                        <a href="/example">Books</a>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <a className="text-gray-500 mx-2" href="/blogs">
                        Blogs
                      </a>
                      <a className="text-gray-500 mx-2" href="/news">
                        News
                      </a>
                      <a className="text-gray-500 mx-2" href="/game">
                        Minigame
                      </a>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-sm transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-3 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {solutions.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                >
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
            </div>
            <div className="hidden lg:flex-1 lg:block">
              <TextField
                id="outlined-search"
                label="Search"
                type="search"
                className="w-full"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={enter}
                InputProps={{
                  endAdornment: (
                    <>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchType}
                        label="Type"
                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                        onChange={handleChangeSearch}
          
                      >
                        <MenuItem value={'Books'}>Books</MenuItem>
                        <MenuItem value={'Blogs'}>BLogs</MenuItem>
                        <MenuItem value={'News'}>News</MenuItem>
                      </Select>
                      <SearchIcon
                      className="cursor-pointer"
                      onClick={handleSearch}
                    ></SearchIcon>
                    </>
                  ),
                }}
              />
            </div>

            <div className="-my-2 -mr-2 lg:hidden flex-1 flex justify-end">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="hidden items-center justify-end lg:flex lg:flex-1 lg:w-0 md:hidden">
              <a
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 relative flex"
                href="/cart"
              >
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cart.toString()} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </a>
              {!authState.status ? (
                <>
                  <a
                    onClick={() => {
                      navigate("/signin");
                    }}
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 ml-8"
                  >
                    Sign in
                  </a>
                  <a
                    // href="/signup"
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      // setAuthState(...authState)
                      // console.log(1);
                      navigate("/user/profile");
                    }}
                    // href="/user/profile"
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 ml-8"
                  >
                    Account
                  </a>
                  <a
                    onClick={() => {
                      setAuthState({ username: "", id: "", status: false });
                      localStorage.removeItem("token");
                      navigate("/home");
                    }}
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Logout
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden z-[999]"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>Group 100</div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {resources.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div>
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

export default Navi;
