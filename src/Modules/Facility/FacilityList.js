import React, { useCallback, useEffect, useRef, useState } from "react";
import { GetListById, icons, notify, save, statusChange, submitData } from "../../components/ShareComp";
import { imageUrl, url } from "../../services/Urls";
import Select from "react-select";
import ReactTableShare from "../../components/ReactTableShare";
import CreateFacility from "./CreateFacility";
import hospital from "../../assets/images/loginbanner.jpg";
import { UseFormValidations } from "../../validations/UseFormValidation";
import Status from "../../components/Status";
import { useDispatch, useSelector } from "react-redux";
import { facilityCallBack } from "../../redux/Action";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
const FacilityList = () => {
  const facilityList=useSelector((state)=>state?.facilityList);
 
  const dispatch=useDispatch()
  
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
  
  const fileInputRef = useRef(null);
  const [obj, setobj] = useState({});
  const { data, handleImageUpload } = UseFormValidations({});

  const submit = async (obj) => {
  submitData(dispatch,facilityCallBack,obj,facilityList,setModel,"Facility")
     
};
  const handleButtonClick = (v) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setobj(v);
    }
  };
 
  

  const columns = [
    {
      name: "Img",
      selector: (v) => (
        <div onClick={() => handleButtonClick(v)}>
         
          <img
            src={v?.image ? v?.image: hospital}
            className="img-fluid p-1 text-end ptr"
            style={{ borderRadius: "50px",width:"50px",height:"50px" }}
          />
           <span className="position-absolute " style={{right:"15px"}}>{icons?.upload}</span>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }} // Hide the input field
            onChange={handleImageUpload("image")}
            accept="image/*" // Restrict to image files
          />
        </div>
      ),
      width: "5rem",
    },
    {
      name: "Facility Name",
      cell: (v) => <div className="text-wrap">{v?.facilityName}</div>,
      sortable: true,
      selector: (v) => v?.facilityName,
      width: "20rem",
    },
    {
      name: "short Name",
      cell: (v) => <div className="text-wrap">{v?.shortName}</div>,
      sortable: true,
      selector: (v) => v?.shortName,
      width: "14rem",
    },
    {
      name: "Address",
      cell: (v) => <div className="text-wrap">{v?.address}</div>,
      sortable: true,
      selector: (v) => v?.address,

      width: "20rem",
    },
    {
      name: "Status",
      cell: (v) => <div className="text-wrap" onClick={()=>statusChange(v,facilityList,dispatch,setModel,facilityCallBack)}>{v?.status=="Active"?<MdToggleOn size={25} className='text-success'/>:<MdToggleOff size={25} className='text-danger'/>}</div>,
      sortable: true,
      selector: (v) => v?.status,

      
    },
    {
      name: "Action",
      selector: (v) => (
        <div className="ptr" onClick={() => setModel(v)}>
          {icons?.edit}
        </div>
      ),
      width: "",
    },
  ];

  const handleChang = () => (e) => {
    setSearch(e.target.value);
  };
  const uploadImage = async (image) => {
  
    if(obj?.id!=0){
      let img=URL.createObjectURL(image);
      facilityList?.map((v)=>{
       if(obj?.id==v?.id){
        v["image"]=img
       }
      });
      
            dispatch(facilityCallBack(facilityList))
             setModel(false);
            notify(true,"Image uploaded successfully...!")
     }
  };
 
  const listsearch = () => {
    return (
      <div className=" d-flex flex-wrap " style={{ width: "100%" }}>
        <div className="col-md-12">
          <input
            type="search"
            className="form-control search-control search-bg "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search Facility..."
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (data?.image?.name) {
      uploadImage(data?.image);
    }
  }, [data?.image]);


  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Facility List</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          <div
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
            onClick={() => setModel(!model)}
          >
            {icons?.add}
            <span className="color2">Add Facility</span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={facilityList || []}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model && (
        <CreateFacility
          show={model}
          onHide={() => setModel(false)}
          submit={submit}
        />
      )}
    </div>
  );
};

export default FacilityList;
