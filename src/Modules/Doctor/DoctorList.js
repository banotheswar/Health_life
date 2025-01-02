import React, { useEffect, useRef, useState } from "react";
import { imageUrl, url } from "../../services/Urls";
import { filterActiveList, GetListById, icons, save, sortingTable, submitData } from "../../components/ShareComp";
import ReactTableShare from "../../components/ReactTableShare";
import CreateDoctor from "./CreateDoctor";
import Select from "react-select";
import AssignModel from "../Users/AssignModel";
import { UseFormValidations } from "../../validations/UseFormValidation";
import CreateAvailability from "./CreateAvailability";
import { NavLink } from "react-router-dom";
import User from "../../assets/images/user.jpg"
import { useDispatch, useSelector } from "react-redux";
import { availabilityCallBack, doctorCallBack } from "../../redux/Action";
const DoctorList = () => {
 
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
 const [update,setUpdate]=useState(false)
  const {handleImageUpload} = UseFormValidations({});

  const fileInputRef = useRef(null);
    const [obj,setobj]=useState({})
  
  const {doctorList,facilityList,specialtyList,availablityList}=useSelector((state)=>state)

const dispatch=useDispatch()

  const submit = async (obj) => {
  submitData(dispatch,doctorCallBack,obj,doctorList,setModel,"Doctor")
  
  };  
  const submitAvailability = async (obj) => {
   submitData(dispatch,availabilityCallBack,obj,availablityList,setModel,"Availability",setUpdate)
   doctorList?.map((v)=>{
    if(v?.id==obj?.doctorId){
        v["availability"]=true
    }
  })
   dispatch(doctorCallBack(doctorList))
    
    };
  const openModal = (name, value) => {
    setModel({
      [name]: value,
    });
  };

  
  const columns = [
   
    {
      name: "Name",
      selector: (v) => <div  onClick={()=>handleButtonClick(v)}>
        <div className="d-flex flex-wrap gap-2 align-items-center ptr">
        <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }} 
        onChange={handleImageUpload("image")}
        accept="image/*"
      />
          <img src={v?.image?imageUrl+'Users/'+v?.image: User} className="img-fluid rounded border" style={{height:"30px",width:"30px"}}/>
           <span>{v.firstName+" "+v?.lastName}</span>
           </div>
        
      </div>,
      sortable: true,
      sortFunction: (a, b) => sortingTable(a, b, "userName"),

      width: "14rem",
    },
    { name: "Email", selector: (v) => <div className="text-wrap">{v?.email}</div>, sortable: true, width: "12rem" },
    { name: "Gender", selector: (v) => <div className="text-wrap">{v?.gender}</div> , sortable: true, width: "8rem" },

    { name: "phone", selector: (v) =><div className="text-wrap">{v?.phone&&"+91"+" "+v?.phone}</div> , sortable: true, width: "10rem" },
   
    {
      name: "facility",
      selector: (v) =>v?.facility?.label||v?.facility,
      // sortable: true,
      width: "13rem",
    },
    {
      name: "Speciality",
      selector: (v) =>Array.isArray(v?.speciality)?v?.speciality?.map(({label})=><li>{label}</li>):v?.speciality,
      // sortable: true,
      width: "12rem",
    },
    {
      name: "Action",
      selector: (v) => (
        <div className="ptr d-flex gap-2">
          <span onClick={() => openModal("user", v)}>{icons?.edit}</span>
          {v?.availability&&<span onClick={() => openModal("availability", v)}>{icons?.available}</span>}
          
        </div>
      ),
      
      width: "",
    },
  ];

  const handleChang = () => (e) => {
    setSearch(e.target.value);
  };
  const handleButtonClick = (v) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setobj(v) 
    }
  };
  const listsearch = () => {
    return (
      <div className=" d-flex flex-wrap gap-1" style={{ width: "100%" }}>
        <div className="col">
          <input
            type="search"
            className="form-control search-control search-bg "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search Doctors..."
          />
        </div>
        
      </div>
    );
  };

  const generateTimeSlots = (startTime, endTime, intervalMinutes) => {
    const slots = [];
    let current = new Date(startTime);
  
    while (current < new Date(endTime)) {
      const end = new Date(current.getTime() + intervalMinutes * 60000);
      slots.push({ start: current, end });
      current = end;
    }
  
    return slots;
  };
  
  // Example usage
  const availability = generateTimeSlots(
    "2025-01-01T10:00:00", 
    "2025-01-01T11:00:00", 
    30
  );
  console?.log(availability,"availability")
  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Doctors</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
        <NavLink to={"/bluhealth/doctor/availability"}
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center none"
            
          >
            {icons.add}
            <span className="color2">View Availability</span>
          </NavLink >
        <div
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
            onClick={() => openModal("availability", true)}
          >
            {icons.add}
            <span className="color2">Add Availability</span>
          </div>
          <div
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
            onClick={() => openModal("user", true)}
          >
            {icons.add}
            <span className="color2">Add Doctor</span>
          </div>
         
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={doctorList}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model?.user && (
        <CreateDoctor
          show={model?.user}
          onHide={() => setModel(false)}
          submit={submit}
          doctorList={filterActiveList(doctorList)} facilityList={filterActiveList(facilityList)}
          specialtyList={filterActiveList(specialtyList)}
        />
      )}
      
      {model?.availability&&<CreateAvailability show={model?.availability} availablityList={availablityList}doctorList={filterActiveList(doctorList)} facilityList={filterActiveList(facilityList)} onHide={() => setModel(false)} submit={submitAvailability}/>}
    </div>
  );
};

export default DoctorList;
