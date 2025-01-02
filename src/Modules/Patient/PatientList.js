import React, { useEffect, useRef, useState } from "react";
import { GetListById, icons, save, sortingTable } from "../../components/ShareComp";
import { imageUrl, url } from "../../services/Urls";
import Select from "react-select";
import ReactTableShare from "../../components/ReactTableShare";
import CreatePatient from "./CreatePatient";
import AssignModel from "../Users/AssignModel";
import { UseFormValidations } from "../../validations/UseFormValidation";
import User from "../../assets/images/user.jpg";
const PatientList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
  const [update, setUpdate] = useState([]);
  const [hospitalAll, setHospitalAll] = useState([]);
  const fileInputRef = useRef(null);
  const [obj, setobj] = useState({});
  const { data, handleChangeSearch, handleImageUpload, setValues } =
    UseFormValidations({});
  const GetAllFscility = async () => {
    let res = await GetListById(url.orderListHospital, { id: 0 });
    res?.map((v) => {
      v["label"] = v?.hospitalName;
      v["value"] = v?.hospitalId;
    });
    setHospitalAll(res);
  };
  const getAllScan = async () => {
    let res = await GetListById(url.getAllUser, { id: 0 });
    res?.map((v) => {
      v?.userHospitals?.map((c) => {
        c["label"] = c.hospitalName;
        c["value"] = c.hospitalId;
      });
    });
    let result = res?.filter((v) => v.roleId == 5);
    setList(result);
  };
  const submit = async (obj) => {
    const res = await save(url?.saveDoctors, obj);
    setUpdate(res);
    setModel(false);
  };
  const openModal = (name, value) => {
    setModel({
      [name]: value,
    });
  };

  const assignHospital = async (obj) => {
    let res = await save(url?.assignHospital, obj);
    setUpdate(res);
    setModel(false);
  };
  const uploadImage = async (v) => {
    const formData = new FormData();
    formData.append("id", obj?.userId);
    formData.append("image", v);
    let res = await save(url.userUpload, formData);
    if (res?.status) {
      setUpdate(res);
      setValues({});
    }
  };
  const handleButtonClick = (v) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setobj(v);
    }
  };
  const columns = [
    {
      name: "Name",
      selector: (v) => (
        <div onClick={() => handleButtonClick(v)}>
          <div className="d-flex flex-wrap gap-2 align-items-center ptr ">
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }} // Hide the input field
              onChange={handleImageUpload("image")}
              accept="image/*" // Restrict to image files
            />
            <img
              src={v?.image ? imageUrl + "Users/" + v?.image : User}
              className="img-fluid rounded border"
              style={{ height: "30px", width: "30px" }}
            />
            <span>{v.userName}</span>
          </div>
        </div>
      ),
      sortable: true,
      sortFunction:( a,b)=>sortingTable(a,b,"userName"),
      width: "14rem",
    },
    {
      name: "Email",
      selector: (v) => <div className="text-wrap">{v?.email}</div>,
      sortable: true,
      width: "14rem",
      sortFunction:( a,b)=>sortingTable(a,b,"email"),
    },
    { name: "Gender", selector: (v) => v?.gender, sortable: true, width: "" },

    {
      name: "phone",
      selector: (v) => <div className="text-wrap">{v?.phone && "+91" + " " + v?.phone}</div>,
      sortable: true,
      width: "10rem",
    },

    {
      name: "Hospital",
      selector: (v) => v?.userHospitals?.map((v) => <li className="text-wrap">{v?.hospitalName}</li>),
      sortable: true,
      width: "13rem",
    },
    {
      name: "Action",
      selector: (v) => (
        <div className="ptr d-flex gap-2">
          <span onClick={() => openModal("user", v)}>{icons?.edit}</span>
          <span onClick={() => openModal("assign", v)}>
            {icons?.assignHospital}
          </span>
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
            className="form-control search-control search-bg "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search Patients..."
          />
        </div>
        
      </div>
    );
  };

  useEffect(() => {
    GetAllFscility();
  }, []);
  useEffect(() => {
    getAllScan();
  }, [update]);
  useEffect(() => {
    if (data?.image?.name) {
      uploadImage(data?.image);
    }
  }, [data?.image]);
  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Patients</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          <div
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
            onClick={() => openModal("user", true)}
          >
            {icons.add}
            <span className="color2">Add Patient</span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={list}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model?.user && (
        <CreatePatient
          show={model?.user}
          onHide={() => setModel(false)}
          submit={submit}
        />
      )}
      {model?.assign && (
        <AssignModel
          show={model?.assign}
          onHide={() => setModel(false)}
          hospitalAll={hospitalAll}
          submit={assignHospital}
        />
      )}
    </div>
  );
};

export default PatientList;
