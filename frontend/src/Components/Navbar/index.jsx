import React, { useState, useEffect } from "react";
import {
  Navbar,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutRequest,
  logOutSuccess,
  logOutFailure,
} from "../../Redux/Slices/UserSlices";
import axios from "axios";

// const profileMenuItems = [
//   {
//     label: "Sign Out",
//     icon: PowerIcon,
//   },
// ];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      console.log("lakdsjflsaj");
      dispatch(logOutRequest());
      let res = "";
      if (import.meta.env.VITE_DEV_MODE == "production") {
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/logout`
        );
      } else {
        res = await axios.get(`/api/v1/logout`);
      }

      console.log("res", res?.data);
      dispatch(logOutSuccess(res?.data));
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(logOutFailure(error?.response?.data));
    }
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt={user?.fullname}
            className="border border-gray-900 p-0.5"
            src={user?.avatar}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={closeMenu}
          className="flex items-center gap-2 rounded
                hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
            onClick={logOutHandler}
          >
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>

      {/* <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList> */}
    </Menu>
  );
}

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const { success } = useSelector((state) => state.user);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  //   const navList = (
  //     <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //       <Typography
  //         as="li"
  //         variant="small"
  //         color="blue-gray"
  //         className="p-1 font-normal"
  //       >
  //         <a href="#" className="flex items-center">
  //           Pages
  //         </a>
  //       </Typography>
  //       <Typography
  //         as="li"
  //         variant="small"
  //         color="blue-gray"
  //         className="p-1 font-normal"
  //       >
  //         <a href="#" className="flex items-center">
  //           Account
  //         </a>
  //       </Typography>
  //       <Typography
  //         as="li"
  //         variant="small"
  //         color="blue-gray"
  //         className="p-1 font-normal"
  //       >
  //         <a href="#" className="flex items-center">
  //           Blocks
  //         </a>
  //       </Typography>
  //       <Typography
  //         as="li"
  //         variant="small"
  //         color="blue-gray"
  //         className="p-1 font-normal"
  //       >
  //         <a href="#" className="flex items-center">
  //           Docs
  //         </a>
  //       </Typography>
  //     </ul>
  //   );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            URL Shortner
          </Typography>
          <div className="flex items-center gap-4">
            {/* <div className="mr-4 hidden lg:block">{navList}</div> */}
            <div className="flex items-center gap-x-1">
              {success && success ? (
                <ProfileMenu />
              ) : (
                <Link to="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
              )}
            </div>
            {/* <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton> */}
          </div>
        </div>

        <Collapse open={openNav}>
          {/* {navList} */}
          <div className="flex items-center gap-x-1">
            {success && success ? (
              <ProfileMenu />
            ) : (
              <Link to="/login">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Log In</span>
                </Button>
              </Link>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
