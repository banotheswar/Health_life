import React,{useState} from "react";
import {checkRole,icons,statusChange,submitData} from "../../components/ShareComp";
import ReactTableShare from "../../components/ReactTableShare";
import AddRoom from "./AddRoom";
import { useDispatch, useSelector } from "react-redux";
import {roomCallBack } from "../../redux/Action";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import Status from "../../components/Status";
const RoomList = () => {

  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
  const {roomList}=useSelector((state)=>state);
  const dispatch=useDispatch()

  const submit = async (obj) => {
   
    submitData(dispatch,roomCallBack,obj,roomList,setModel,"Room")
  };

  const columns = [
    {
      name: "Id",
      selector: (v) =>v?.id,
      width: "5rem",
      sortable: true,
     
    },
    {
      name: "Facility",
      selector: (v) => <div className="text-wrap">{v?.facilityName}</div>,
      width: "14rem",
    },
    {
      name: "Block",
      selector: (v) => <div className="text-wrap">{v?.block}</div>,
      width: "10rem",
    },
    {
      name: "Floor",
      selector: (v) => <div className="text-wrap">{v?.floor}</div>,
      width: "10rem",
    },
    {
      name: "Room No",
      selector: (v) => <div className="text-wrap">{v?.roomNo}</div>,
      width: "14rem",
    },
    {
      name: "Status",
      cell: (v) =><Status obj={v} statusChange={()=>statusChange(v,roomList,dispatch,setModel,roomCallBack)}/>,
        //  <div className="text-wrap" onClick={()=>statusChange(v,roomList,dispatch,setModel)}>{v?.status=="Active"?<MdToggleOn size={25} className='text-success'/>:<MdToggleOff size={25} className='text-danger'/>}</div>,
           
      selector: (v) => <div className="text-wrap">{v?.RoomNo}</div>,
      width: "14rem",
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

  const listsearch = () => {
    return (
      <div className=" d-flex flex-wrap gap-1" style={{ width: "100%" }}>
        <div className="col">
          <input
            type="search"
            className="form-control"
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search room list..."
          />
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Room List</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          {!checkRole() && (
            <button
              className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
              onClick={() => setModel(!model)}
            >
              {icons?.add}
              <span className="color2">Add Room</span>
            </button>
          )}
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={roomList}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model && (
        <AddRoom show={model} onHide={() => setModel(false)} submit={submit} />
      )}
    </div>
  );
};

export default RoomList;
