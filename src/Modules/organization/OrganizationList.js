import React, { useEffect, useState } from "react";
import {
  checkRole,
  GetListById,
  icons,
  save,
  sortingTable,
} from "../../components/ShareComp";
import { url } from "../../services/Urls";
import ReactTableShare from "../../components/ReactTableShare";
import CreateOrg from "./CreateOrg";

const OrganizationList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [model, setModel] = useState(false);
  const [update, setUpdate] = useState([]);
  const getAllOrg = async () => {
    let res = await GetListById(url.getAllOrg, { id: 0 });
    console.log(res, "res123");
    setList(res);
  };
  const submit = async (obj) => {
    const res = await save(url?.orgSave, obj);
    setUpdate(res);
    setModel(false);
  };
  const customNumberSort = (rowA, rowB, key) => {
    return rowA?.[key] - rowB?.[key]; // Numeric sorting
  };
  const columns = [
    // {name:"Sno",selector:(v)=>v.organizationId,sortable:true,width:"12rem"},
    {
      name: "Name",
      cell: (v) => v?.organizationName,
      selector: (v) => v?.organizationName,
      sortable: true,
      width: "",
      sortFunction:( a,b)=>sortingTable(a,b,"organizationName"),
    },
    {
      name: "Short Name",
      cell: (v) => v?.shortName,
      selector: (v) => v?.shortName,
      sortable: true,
      sortFunction: (a,b)=>sortingTable(a,b,"shortName"),
      width: "",
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
            placeholder="Search..."
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    getAllOrg();
  }, [update]);
  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        <div className="col-md-6 px-2 heading_list ">Organization</div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
          {!checkRole() && (
            <button
              className="btn bg_btn col-auto text-white d-flex gap-2 align-items-center"
              onClick={() => setModel(!model)}
            >
              {icons.add}
              <span className="color2">Add Organization</span>
            </button>
          )}
        </div>
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={list || []}
          columns={columns || []}
          search1={listsearch}
          search={search}
        />
      </div>
      {model && (
        <CreateOrg
          show={model}
          onHide={() => setModel(false)}
          submit={submit}
        />
      )}
    </div>
  );
};

export default OrganizationList;
