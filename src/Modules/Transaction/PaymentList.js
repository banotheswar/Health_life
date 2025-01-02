import React, { useEffect, useState } from "react";
import { GetListById, sortingTable, sortingTableNumbers } from "../../components/ShareComp";
import { url } from "../../services/Urls";
import ReactTableShare from "../../components/ReactTableShare";
import moment from "moment";

const PaymentList = ({ dataList }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const getAllPayment = async () => {
    let res = await GetListById(
      dataList ? url.payment.planTransactionById : url?.payment?.getAllPayement,
      { id: dataList ? sessionStorage.getItem("userId") : 0 }
    );
    res?.map((v) => {
      v["planName"] =
        v?.planId == 3
          ? "Annually"
          : v?.planId == 2
          ? "Quarterly"
          : v.planId == 1
          ? "Monthly"
          : v.planId == 0
          ? "Monthly"
          : "";
      v["color"] =
        v?.planId == 3
          ? "plan-premium"
          : v?.planId == 2
          ? "plan-elite"
          : v.planId == 1
          ? "plan-standard"
          : v.planId == 0
          ? "plan-standard"
          : "";
      v["startDate"] = moment(v?.startDate).format("DD-MM-YYYY");
      v["endDate"] = moment(v.endDate).format("DD-MM-YYYY");
      v["planType"] =
        v?.planType == "SubscriptionPlan" ? "Subscription" : "Scan Package";
    });
    setList(res);
  };

  const columns = [
    {
      name: "Name",
      selector: (v) => v.userName,
      sortable: true,
      sortFunction: (a, b) => sortingTable(a, b, "userName"),
      width: "12rem",
    },
    {
      name: "Plan Name",
      selector: (v) => (
        <div className={`${v?.color} text-center`} style={{ width: "6rem" }}>
          {v?.planName}
        </div>
      ),
      sortable: true,
      sortFunction: (a, b) => sortingTable(a, b, "planName"),
      width: "10rem",
    },
    {
      name: "Amount",
      selector: (v) => v.amount && `Rs.${v.amount}`,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Scans",
      selector: (v) => (
        <div className={`${v?.color} text-center p-2`}>{v.purchaseScans}</div>
      ),
      sortable: true,
      width: "6rem",
      sortFunction: (a, b) => sortingTableNumbers(a, b, "purchaseScans"),
    },
    {
      name: "start Date",
      selector: (v) => v?.startDate,
      sortable: true,
      width: "8rem",
      sortFunction: (a, b) => sortingTable(a, b, "startDate"),

    },
    {
      name: "End Date",
      selector: (v) => v?.endDate,
      sortable: true,
      width: "8rem",
      sortFunction: (a, b) => sortingTable(a, b, "endDate"),
    },
    {
      name: "Plan Type",
      selector: (v) => v.planType,
      sortable: true,
      width: "8rem",
    },
    {
      name: "T_Id",
      selector: (v) => (
        <div className="text-wrap" title={v.transactionId}>
          {v.transactionId}
        </div>
      ),
      sortable: true,
      sortFunction: (a, b) => sortingTable(a, b, "transactionId"),
      // width: "9rem",
    },
    {
      name: "Validity",
      selector: (v) => v.planValidity,
      sortable: true,
     width: "9rem",
      sortFunction: (a, b) => sortingTableNumbers(a, b, "planValidity"),
    },
  ];
  let colList = dataList ? columns?.filter((v) => v?.name != "Name") : columns;
  const handleChang = () => (e) => {
    setSearch(e.target.value);
  };

  const listsearch = () => {
    return (
      <div className=" d-flex flex-wrap " style={{ width: "100%" }}>
        <div className="col">
          <input
            type="search"
            className="form-control search-control search-bg "
            value={search != "" ? search : ""}
            onChange={handleChang()}
            placeholder="Search..."
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    getAllPayment();
  }, []);
  return (
    <div>
      <div className="d-flex flex-wrap py-1">
        {!dataList && (
          <div className="col-md-6 px-2 heading_list ">Transaction List</div>
        )}
      </div>
      <div className="py-2">
        <ReactTableShare
          dataTable={list}
          columns={colList || []}
          search1={listsearch}
          search={search}
        />
      </div>
    </div>
  );
};

export default PaymentList;
