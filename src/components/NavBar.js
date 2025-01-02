import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { MdAssignmentAdd, MdBedroomParent, MdDashboard } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

import {
  FaHome,
  FaHospital,
  FaHandHoldingMedical,
  FaCalendarAlt,
  FaListUl,
} from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { FaClipboardUser, FaUserDoctor } from "react-icons/fa6";


import { logOut } from "./ShareComp";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill, RiOrganizationChart } from "react-icons/ri";

const Navbar = () => {
  const [state, setState] = useState(false);
  const [subMenu, setSubmenu] = useState(true);
  const link = [
    {
      linkName: "Dashboard",
      logo: (
        <MdDashboard
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "dashboard/all",
    },
    {
      linkName: "Appointment",
      logo: (
        <MdAssignmentAdd
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "appointment",
    },
    {
      linkName: "Schedule",
      logo: (
        <FaCalendarAlt
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "schedule",
    },

    {
      linkName: "Transaction",
      logo: (
        <GrTransaction
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "transaction/all",
    },
    {
      linkName: "Patient",
      logo: (
        <FaClipboardUser
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "patient/all",
    },

    {
      label: "Master",
      icon: (
        <FaHome
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      child: [
        {
          linkName: "Appointment Type",
          logo: (
            <FaListUl
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "appointmentType/all",
        },

        {
          linkName: "Facility",
          logo: (
            <FaHospital
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "facility/all",
        },
        {
          linkName: "Doctor",
          logo: (
            <FaUserDoctor
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "doctor/all",
        },
        {
          linkName: "Speciality",
          logo: (
            <FaHandHoldingMedical
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "speciality/all",
        },
        {
          linkName: "Room",
          logo: (
            <MdBedroomParent
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "room/all",
        },
        {
          linkName: "Organization",
          logo: (
            
            <RiOrganizationChart
              size={30}
              color="black"
              className="bg-white  border p-1"
              style={{ borderRadius: "10px" }}
            />
          ),
          url: "room/all",
        },
      ],
      logo: <GiSkills />,
      url: "",
    },
    {
      linkName: "Log Out",
      logo: (
        <AiOutlineLogout
          size={30}
          color="black"
          className="bg-white  border p-1"
          style={{ borderRadius: "10px" }}
        />
      ),
      url: "/",
    },
  ];

  return (
    <div className="d-flex">
      <div className="position-fixed" style={{ zIndex: "1" }}>
        <Sidebar
          transitionDuration={300}
          backgroundColor="#fff"
          collapsed={state}
          style={{
            height: "100vh",
            position: "fixed",
            backgroundColor: "#fff",
          }}
        >
          <div
            className={`d-flex align-items-center border-bottom   gap-2 pointer  ptr`}
            onClick={() => setState(!state)}
            
          >
            <div className="logoHms"></div>
            
          </div>
          {link?.map((v) => {
            return (
              <Menu
                className=""
                menuItemStyles={{
                  button: {
                    [`&.active`]: {
                      backgroundColor: "#47a1c9",
                      color: "#000",
                      height: "40px",
                      fontWeight:600
                    },
                  },
                }}
               
              >
                {v?.linkName && (
                  <MenuItem
                    icon={v?.logo}
                    onClick={v?.linkName == "Log Out" && logOut}
                    component={<NavLink className={"none"} to={v?.url} />}
                  >
                    {v?.linkName}
                  </MenuItem>
                )}
                {v?.child && (
                  <SubMenu
                    className="positon-absolute"
                    open={subMenu}
                    onClick={() => setSubmenu(!subMenu)}
                    icon={v?.icon}
                    title="Master"
                    label={v?.label}
                  >
                    {v?.child?.map((c) => {
                      return (
                        <MenuItem
                          style={{ zIndex: "1" }}
                          icon={c.logo}
                          component={
                            <NavLink className={""} to={c?.url}></NavLink>
                          }
                        >
                          {c?.linkName}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                )}
              </Menu>
            );
          })}
        </Sidebar>
      </div>

      <div
        className={state ? "sidebar" : "sidebar"}
        style={{
          width: "100%",
          marginLeft: state ? "5rem" : "15.5rem",
          transition: "ease-out",
        }}
      >
        <div
          className="  d-flex flex-wrap border-0 border-bottom align-items-center px-3"
          style={{ height: "64px" }}
        >
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex justify-content-end gap-4 "></div>
          <div className="col-md-4 d-flex flex-wrap gap-3 justify-content-end align-items-center">
            <div>
              <RiMessage2Fill size={18} />
            </div>
            <div>
              <IoIosNotifications size={20} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {"Eswar Banoth"}
              </div>
              <div style={{ fontSize: "13px", fontWeight: "400" }}>
                [Super Admin]
              </div>
            </div>
            <div>
              <PiUserCirclePlusBold size={25} />
            </div>
          </div>
        </div>
        <div className="px-2 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
