import { toast } from "react-toastify";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { IoIosCheckmarkCircle, IoMdArrowRoundBack } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import {MdAddCircle,MdBloodtype, MdEventAvailable,} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaHandHoldingMedical, FaHospital } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import instance from "../services/Service";
import { BiSolidImageAdd } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { facilityCallBack } from "../redux/Action";

export const icons = {
  diabetis: "",
  obsety: "",
  cardio: "",
  user: "",
  cart: "",
  click: "",
  excelicon: <PiMicrosoftExcelLogo />,
  roundcircle: "",
  bluecircle: "",
  bluecircle2: <IoIosCheckmarkCircle size={20} color="#539DF3" className="" />,
  backArrow: <IoMdArrowRoundBack />,
  logo: "",
  eyeOpen: <BsEyeFill />,
  eyeClose: <BsEyeSlash />,
  risklevel: "",
  blood: <MdBloodtype />,
  add: <MdAddCircle size={18} />,
  edit: <FiEdit title="Edit" size={18} />,
  editProfile: <LuView size={12} />,
  assignHospital: <FaHospital title="Assign Hospital" size={18} />,
  assignSpecility: <FaHandHoldingMedical size={18} title="Assign Speciality" />,
  transaction: <GrTransaction size={18} />,
  upload:<BiSolidImageAdd size={18}/>,
  available:<MdEventAvailable className="text-success" title="Availability" size={20}/>
};
export const colors = {
  navbg: "#D8F8FF",
};
export const sortingTable=(a,b,key)=>{
   
  const nameA = a?.[key]?.toUpperCase();
  const nameB = b?.[key]?.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;     
  
}

export const sortingTableNumbers=(a,b,key)=>{
// const nameA = a?.[key]?.toString()?.toUpperCase();
// const nameB = b?.[key]?.toString()?.toUpperCase();
// if (nameA < nameB) {
// return -1;
// }
// if (nameA > nameB) {
// return 1;
// }
// return 0; 
const nameA = parseInt(a?.[key]);
        const nameB = parseInt(b?.[key]);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
}
export const notify = (status, msg) => {
  if (status == true) {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
};
export const save = async (url, body) => {
  try {
    var res = await instance?.post(url, body);
    if (res?.data?.data?.user?.roleId == 4) {
      notify(
        false,
        "Doctor login is not available on the website. Please use the Mobile App instead."
      );
    }
    res?.data?.data?.user?.roleId != 4 &&
      notify(res?.data.status, res?.data?.message);
    if (res) {
      return res?.data;
    }
    else{
      return [];
    }
   
  } catch (e) {
    return e;
  }
};
export const GetListById = async (url, body) => {
  try {
    var res = await instance?.post(url, body);

    if (res) {
      return res?.data?.data||[];
    }
    return [];
  } catch (e) {
    return [];
  }
};
export const GetList = async (url, body) => {
  try {
    var res = await instance?.post(url, body);

    if (res) {
      return res?.data?.data||res||[];
    }
    return [];
  } catch (e) {
    return [];
  }
};
export const getSchedule = async (url, data) => {
  try {
    const res = await instance.post(url, data);

    if (res?.data?.status == true) {
      const resdata = res?.data?.data;

      resdata?.map((element) => {
        element["id"] = element?.ScheduleId;

        element["end"] = element?.EndActivity;

        element["start"] = element?.StartActivity;
        element["resource"] = element?.VeterinarianId;

        if (element.activity == "Available") {
          element["barColor"] = "#0F497F";
        } else {
          element["barColor"] = "#088772";
        }
      });
      return resdata;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getScheduleTborda = async (url, data) => {
  try {
    const res = await instance.post(url, data);

    if (res?.data?.status == true) {
      const resdata = res?.data?.data;

      resdata?.map((element) => {
        element["id"] = element?.treatmentPlanId;
        element["end"] = element?.startTime;

        element["text"] = element?.itemDescription;

        element["start"] = element?.startTime;
        // element["start"]=element?.frequencyTime!="00:00:00"?moment(element.date).format("YYYY-MM-DD")+"T"+element.frequencyTime:element.startTime

        element["resource"] = element?.appointmentId;
        element["toolTip"] = element?.itemDescription;

        switch (element?.status) {
          case "Not Completed":
            return (element["backColor"] = "#ffff000");
          case "Completed":
            return (element["backColor"] = "#00FFFF");
          case "Overdue":
            return (element["backColor"] = "#FFFF00");
          case "Not Needed":
            return (element["backColor"] = "#808080");
          default:
            return (element["backColor"] = "#ffff000");
        }
      });
      return resdata;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};
export const checkRole=()=>{
  switch(sessionStorage.getItem("roleId")){
    case "1":return false;
    case "2":return true;
    case "3":return true;
    default:return false
  }
}
export const logOut = () => {
  sessionStorage.clear();
  window.location.pathname = "/";
};
export const customStyles = {
  title: {
    style: {
      fontColor: "red",
      fontWeight: "600",
      borderRadius: "10%",
    },
  },

  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
      // background: "#EBEBED",

      color: "#3A3952",
      width: "auto",
    },
  },

  cells: {
    style: {
      fontWeight: 400,

      opacity: 1,
      letterSpacing: "0px",
      minHeight: "49px",
    },
  },
};

export const submitData=(dispatch,facilityCallBack,obj,facilityList,setModel,msg)=>{
 if(obj?.item=="Exist"){
  let res=facilityList?.map((v)=>v?.id==obj?.id?obj:v)
  dispatch(facilityCallBack(res));
  setModel(false);
  notify(true,`${msg} updated successfully...!`);
  
 }
 else{
  obj["status"]="Active"
      let temp=[obj,...facilityList]
        dispatch(facilityCallBack(temp));
        setModel(false);
        notify(true,`${msg} added successfully...!`);
 }
  }
 
  export const statusChange=(status,facilityList,dispatch,setModel,callbackAction)=>{
   let array=[...facilityList]
   array?.map((v)=>{
          if(status?.id==v?.id){
           v["status"]=status?.status=="Active"?"InActive":"Active"
          }
         });
         
        dispatch(callbackAction(array))
        setModel(false);
        notify(true,"Status updated successfully...!")
  }
export const filterActiveList=(list)=>{
  let res= list?.filter((v)=>v.status!="InActive"&&v.status)
 return res
}