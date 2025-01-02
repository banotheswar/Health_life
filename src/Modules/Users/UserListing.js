import React, { useEffect, useState } from "react";
import { url } from "../../services/Urls";
import {
  checkRole,
  GetListById,
  icons,
  save,
  sortingTable,
  sortingTableNumbers,
} from "../../components/ShareComp";
import ReactTableShare from "../../components/ReactTableShare";
import Select from "react-select";
import CreateUser from "./CreateUser";
import { UseFormValidations } from "../../validations/UseFormValidation";
import { Modal } from "react-bootstrap";
import AssignModel from "./AssignModel";
import User from "../../assets/images/user.jpg";
const UserListing = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
  const [update, setUpdate] = useState([]);
  const [roles, setRoles] = useState([]);
  const [hospitalAll, setHospitalAll] = useState([]);
  const { data, handleChangeSearch } = UseFormValidations({});
  const [col, setCol] = useState([]);
  const getAllScan = async (roleId) => {
    let res = await GetListById(url.getAllUser, { id: 0 });

    res?.map((v) => {
      v?.userHospitals?.map((c) => {
        c["label"] = c.hospitalName;
        c["value"] = c.hospitalId;
      });
      v?.userSpecialities?.map((c) => {
        c["label"] = c.specialityName;
        c["value"] = c.specialityId;
      });
    });

    setList(roleId ? res?.filter((v) => v.roleId == roleId) : res);
  };
  const getAllrole = async () => {
    let res = await GetListById(url.getAllRoles, { id: 0 });
    let result = res?.filter(
      (v) =>
        v.roleId != sessionStorage.getItem("roleId") &&
        (sessionStorage.getItem("roleId") == 2 ? v.roleId != 1 : v?.roleId != 1)
    );

    result?.map((v) => {
      v["label"] = v?.roleName;
      v["value"] = v?.roleId;
      data["roleId"] =
        sessionStorage.getItem("roleId") == 1
          ? { label: "Organization Admin", value: "2" }
          : sessionStorage.getItem("roleId") == 2 && {
              label: "Hospital Admin",
              value: "3",
            };
    });

    setRoles(result);
  };
  const GetAllFscility = async () => {
    let res = await GetListById(url.orderListHospital, { id: 0 });
    res?.map((v) => {
      v["label"] = v?.hospitalName;
      v["value"] = v?.hospitalId;
    });
    setHospitalAll(res);
  };

  const assignHospital = async (obj) => {
    let res = await save(url?.assignHospital, obj);
    setUpdate(res);
    setModel(false);
  };
  const assignspeciality = async (obj) => {
    let res = await save(url?.orderListspecilaity, obj);
    setUpdate(res);
    setModel(false);
  };
  const submit = async (obj) => {
    const res = await save(url?.saveDoctors, obj);
    setUpdate(res);
    setModel(false);
  };
  const openModal = (name, value) => {
    setModel({
      ...Modal,
      [name]: value,
    });
  };
  const columns = [
    {
      name: "Name",
      selector: (v) => (
        <div className="d-flex flex-wrap">
          <div>
            <img
              src={User}
              className="img-fluid rounded"
              style={{ height: "30px", width: "30px" }}
            />{" "}
            <span>{v?.userName}</span>
          </div>
        </div>
      ),

      width: "12rem",
      sortFunction: (a, b) => sortingTable(a, b, "userName"),
    },
    {
      name: "Email",
      selector: (v) => <div className="text-wrap">{v?.email}</div>,

      width: "10rem",
      sortFunction: (a, b) => sortingTable(a, b, "email"),
    },
    { name: "Gender", selector: (v) => <div className="text-wrap">{v?.gender}</div>,  width: "7rem" ,sortFunction: (a, b) => sortingTable(a, b, "gender"),},

    {
      name: "phone",
      selector: (v) => (
        <div className="text-wrap">{v?.phone && "+91" + " " + v?.phone}</div>
      ),
      width: "9rem",
      sortFunction: (a, b) => sortingTableNumbers(a, b, "phone"),
    },
    // {name:"Weight",selector:(v)=>v?.weight,sortable:true,width:""},
    {
      name: "Role",
      selector: (v) => <div className="text-wrap">{v?.roleName}</div>,

      width: "",
      sortFunction: (a, b) => sortingTable(a, b, "roleName"),
    },
    {
      name: "Org",
      selector: (v) => <div className="text-wrap">{v?.organizationName}</div>,

      sortFunction: (a, b) => sortingTable(a, b, "organizationName"),
    },
    {
      name: "Hospital",
      selector: (v) =>
        v?.userHospitals?.map((v) => (
          <li className="text-wrap ">{v?.hospitalName}</li>
        )),
      width: "12rem",
    },
    {
      name: "Speciality",
      selector: (v) =>
        v?.userSpecialities?.map((v) => (
          <li className="text-wrap">{v?.specialityName}</li>
        )),
      width: "10rem",
    },
    {
      name: "Action",
      selector: (v) => (
        <div className="ptr d-flex gap-2">
          <span onClick={() => openModal("user", v)}>{icons?.edit}</span>
          {v?.roleId != 2 && (
            <span onClick={() => openModal("assign", v)}>
              {icons?.assignHospital}
            </span>
          )}
          {v?.roleId == 4 && (
            <span onClick={() => openModal("speciality", v)}>
              {icons?.assignSpecility}
            </span>
          )}
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
      <div className="col-md-12 d-flex flex-wrap  gap-1">
        <div className="col">
          <input
            type="search"
            className="form-control "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search users..."
          />
        </div>

        <div className="col">
          <Select
            isClearable
            value={data?.roleId}
            options={roles}
            placeholder={"Select Role"}
            className=" text-start"
            name="role"
            onChange={handleChangeSearch("roleId")}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllrole();
    GetAllFscility();
  }, []);

  useEffect(() => {
    getAllScan(data?.roleId?.value);
  }, [update, data?.roleId?.value]);

  useEffect(() => {
    if (data?.roleId?.value == "2") {
      let arr = columns.filter(
        (v) => v.name != "Speciality" && v.name != "Hospital"
      );

      setCol(arr);
    } else if (data?.roleId?.value == "3" || data?.roleId?.value == "5") {
      let arr = columns.filter(
        (v) => v.name != "Speciality" && v.name != "Org"
      );

      setCol(arr);
    } else {
      setCol(columns);
    }
  }, [data?.roleId?.value, list]);
  console?.log(data?.roleId?.value, "check");

  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Users</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          <div
            className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
            onClick={() => openModal("user", true)}
          >
            {icons.add}
            <span className="color2">Add User</span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={list}
          columns={col || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model.user && (
        <CreateUser
          check={true}
          show={model?.user}
          onHide={() => openModal(false)}
          submit={submit}
          role={roles}
        />
      )}

      {model?.assign && (
        <AssignModel
          show={model?.assign}
          onHide={() => openModal(false)}
          role={roles}
          hospitalAll={hospitalAll}
          submit={assignHospital}
        />
      )}
      {model?.speciality && (
        <AssignModel
          show={model?.speciality}
          onHide={() => openModal(false)}
          speciality={true}
          hospitalAll={hospitalAll}
          submit={assignspeciality}
        />
      )}
    </div>
  );
};

export default UserListing;
