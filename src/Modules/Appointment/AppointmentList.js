import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  icons,
  sortingTable,
  sortingTableNumbers,
} from "../../components/ShareComp";
import ReactTableShare from "../../components/ReactTableShare";
import User from "../../assets/images/user.jpg";
import CreateAppointment from "./CreateAppointment";
import Select from "react-select";
import moment from "moment";
import { UseFormValidations } from "../../validations/UseFormValidation";
const AppointmentList = (props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const { handleChangeSearch } = UseFormValidations({});
  const columns = [
    {
      name: "Id",
      selector: (v) => v?.Id,
      width: "4rem",
      sortFunction: (a, b) => sortingTableNumbers(a, b, "appointmentId"),
    },

    {
      name: "Name",
      selector: (v) => <div className="text-wrap">{v?.FullName}</div>,
      sortable: true,
      width: "10rem",
      sortFunction: (a, b) => sortingTable(a, b, "patientName"),
    },
    {
      name: "Email",
      selector: (v) => <div className="text-wrap">{v?.Email}</div>,
      sortable: true,
      width: "12rem",
      sortFunction: (a, b) => sortingTable(a, b, "Email"),
    },

    {
      name: "Hospital",
      selector: (v) => <div className="text-wrap">{v?.FacilityName}</div>,
      sortable: true,
      width: "10rem",
      sortFunction: (a, b) => sortingTable(a, b, "FacilityName"),
    },
    {
      name: "Date&Time",
      selector: (v) => (
        <div>
          <div className="">{v?.Date}</div>
          <div
            style={{ fontSize: "12px", fontWeight: "500" }}
          >{`[${v?.Time}]`}</div>
        </div>
      ),
      // sortable: true,
      width: "10rem",
      sortFunction: (a, b) => sortingTable(a, b, "preferredDate"),
    },
    {
      name: "Doctor",
      selector: (v) => (
        <div>
          <div>{v?.Doctor}</div>
          <div
            style={{ fontSize: "12px", fontWeight: "500" }}
          >{`[${v?.Specialty}]`}</div>
        </div>
      ),

      sortable: true,
      width: "10rem",
      sortFunction: (a, b) => sortingTable(a, b, "clinicianName"),
    },
    {
      name: "Type",
      selector: (v) => <div className="text-wrap">{v?.type}</div>,
      sortFunction: (a, b) => sortingTable(a, b, "type"),
      sortable: true,
      width: "8rem",
    },
    {
      name: "Status",
      selector: (v) => (
        <div className="">
          <div
            className={
              v.Status == "Completed"
                ? "status_comp p-1 px-2 text-wrap"
                : v.Status == "Waitlisted"
                ? "status_wait p-1 px-2 te text-wrap"
                : v.Status == "Checkin" && "status_check p-1 px-3 te text-wrap"
            }
          >
            {v?.Status}
          </div>
        </div>
      ),

      sortable: true,
      width: "10rem",
    },
    {
      name: "Action",
      selector: (v) => (
        <div className="ptr d-flex gap-2">
          <span onClick={() => ("user", v)}>{icons?.edit}</span>

         
        </div>
      ),
      sortable: true,
      width: "",
    },
  ];
 const appList= [
    {
      "Id":1,
        "FullName": "John Doe",
        "Email": "john.doe@example.com",
        "Gender": "Male",
        "Doctor": "Dr. Sarah Smith",
        "Date": "2024-12-20",
        "Time": "10:00 AM",
        "Status": "Confirmed",
        "FacilityName": "City Hospital",
        "Specialty": "Cardiology",
    },
    {
      "Id":2,
        "FullName": "Jane Roe",
        "Email": "jane.roe@example.com",
        "Gender": "Female",
        "Doctor": "Dr. Mark Lee",
        "Date": "2024-12-21",
        "Time": "2:00 PM",
        "Status": "Pending",
        "FacilityName": "Central Clinic"
   ,
   "Specialty": "Cardiology", },
    {
      "Id":3,
        "FullName": "Alice Brown",
        "Email": "alice.brown@example.com",
        "Gender": "Female",
        "Doctor": "Dr. Emma Davis",
        "Date": "2024-12-22",
        "Time": "11:00 AM",
        "Status": "Confirmed",
        "FacilityName": "Downtown Medical"
 ,
 "Specialty": "Cardiology",   },
    {
      "Id":4,
        "FullName": "Bob Smith",
        "Email": "bob.smith@example.com",
        "Gender": "Male",
        "Doctor": "Dr. John Carter",
        "Date": "2024-12-23",
        "Time": "1:00 PM",
        "Status": "Cancelled",
        "FacilityName": "Eastside Clinic"
  ,
 "Specialty": "Cardiology",  },
    {
      "Id":5,
        "FullName": "Clara Jones",
        "Email": "clara.jones@example.com",
        "Gender": "Female",
        "Doctor": "Dr. Alex Moore",
        "Date": "2024-12-24",
        "Time": "3:30 PM",
        "Status": "Confirmed",
        "FacilityName": "Southview Hospital",
         "Specialty": "Cardiology",
    },
    {
      "Id":6,
        "FullName": "David Lee",
        "Email": "david.lee@example.com",
        "Gender": "Male",
        "Doctor": "Dr. Lisa Taylor",
        "Date": "2024-12-25",
        "Time": "9:30 AM",
        "Status": "Pending",
        "FacilityName": "Northside Medical"
,
 "Specialty": "Cardiology",    },
    {
      "Id":7,
        "FullName": "Emma White",
        "Email": "emma.white@example.com",
        "Gender": "Female",
        "Doctor": "Dr. Daniel Green",
        "Date": "2024-12-26",
        "Time": "10:15 AM",
        "Status": "Confirmed",
        "FacilityName": "Central Hospital"
 ,
 "Specialty": "Cardiology",   },
    {
      "Id":8,
        "FullName": "Frank Black",
        "Email": "frank.black@example.com",
        "Gender": "Male",
        "Doctor": "Dr. Olivia Brown",
        "Date": "2024-12-27",
        "Time": "4:00 PM",
        "Status": "Pending",
        "FacilityName": "Westview Clinic"
  ,
 "Specialty": "Cardiology",  }
]

  const handleChang = () => (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setList(appList);
  }, [appList]);
 

  const listsearch = () => {
    return (
      <div className=" col-md-12 d-flex flex-wrap gap-1">
        <div className="col-6">
          <input
            type="search"
            className="form-control search-control search-bg "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search..."
          />
        </div>
        <div className="col">
          <Select
            styles={{ zIndex: "1" }}
            isClearable={true}
            options={props?.hospital}
            placeholder={"Select Hospital"}
            className="text-start index"
            name="facility"
            onChange={handleChangeSearch("hospitalId")}
          />
        </div>
        {/* <div className="col">
          <Select
           
            isClearable={true}
            options={props?.doctor}
            placeholder={"Select Doctor"}
            className="text-start"
            name="facility"
            onChange={handleChangeSearch("userId")}
          />
        </div> */}
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Appointment</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          <div
            className="btn bg_btn col-auto  d-flex gap-2 align-items-center"
            // onClick={show}
          >
            {icons.add}
            <span className="color2" >Add Appointment</span>
          </div>
        </div>
      </div>
      <div className="py-2 ">
        <ReactTableShare
          dataTable={list || []}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
        {open && (
          <CreateAppointment show={open} onHide={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
