import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import Razorpay from "./RazorpayFromAppointment";
import { save ,GetListById} from "../components/ShareComp";
import { url } from "../services/Urls";

const OpenRaz = ({setIsModalOpen,payement,update,obj}) => {
  const navigate = useNavigate();
 
 
  
  const pay = async (payId) => {
    const tempEndDate = new Date();
    tempEndDate.setDate(tempEndDate.getDate() +parseInt(payement?.planValidity))
    
    let body={
      "userId": sessionStorage.getItem("userId"),
  "planId": payement?.planId||obj?.planId,
  "prevScans": obj?.scansLimit,
  "purchaseScans": payement?.totalScans,
  "amount": payement?.amount,
  "planValidity": payement?.planValidity+" "+"days",
  "startDate": new Date(),
  "endDate":tempEndDate,
  "paymentStatus": "paid",
  "transactionId": payId?.razorpay_payment_id,
  "planType": payement?.planType,
    }
    //{ id: appointmentId, status: "Paid", paymentType: "Razorpay" }
    let res = await save(url.paymentForplan, body);
console?.log(res,res.status,"check")
    if(res.status){
      navigate("/dashboard")
      update(res)
      
      setIsModalOpen("")
    }


  };

  console?.log(payement,"payement")

  return <div>
    {payement&& <Razorpay parentCallback={pay} amount={payement?.amount} setIsModalOpen={setIsModalOpen} />}
    </div>;
};

export default OpenRaz;
