import React from 'react'
import { Bar ,PolarArea,Line,Doughnut} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  ArcElement,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement,RadialLinearScale,ArcElement,LineElement,PointElement, Title, Tooltip, Legend);
// ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const Dashboard = () => {

    const data = {
        labels: ["Consultation", "Follow-up Appointment", "Routine Check-up", "Emergency Appointment", "Specialist Referral"],
        datasets: [
          {
            label: "Appointment-Type",
            data: [55, 49, 44, 24, 15],
            backgroundColor: ["red", "green", "blue", "orange", "brown"],
          },
        ],
      };
      const payment = {
        labels: ["Jan", "Feb", "March", "April", "June"],
        datasets: [
          {
            label: "Transactions",
            data: [55, 49, 44, 24, 15],
            backgroundColor: ["red", "green", "blue", "orange", "brown"],
          },
        ],
      };
      const allUsers = {
        labels: ["Organization-Admin", "Facility-Admin", "Doctors", "Patients","Staff"],
        datasets: [
          {
            label: "Transactions",
            data: [55, 49, 44, 24, 15],
            backgroundColor: ["red", "green", "blue", "orange", "brown"],
            fontSize:"40px"
          },
        ],
      };


      
    
      const options = (title)=>{
       let opt= {
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: title,
            fontSize:"20px"
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
      return opt
      }


      const chartsdata= [{name:"Appointment-Type",data:data},{name:"Transactions",data:payment},{name:"All-Users",data:allUsers},{name:"All-Analysis Data",data:data}]
  return (
    <div className='bg-light'>
<div className='row '>
       
       {[1,2,3,4,]?.map((v)=>{
           return (
               <div className='col-md-3'>
<div className=' border text-center align-center ' style={{height:"6rem",borderRadius:"20px"}}>
3
</div>

           </div>
           )
       })}
       <div className='row '>
      
     {chartsdata?.map((v)=>{
        return(
            <div className='col-md-6 p-2'>
                <div className='py-3 mx-2 px-3 rounded border bg-white col-md-12' style={{height:"20rem"}}>
           <h5>{v?.name}</h5>
       {v?.name=="Appointment-Type"&&<Bar data={v?.data} options={options("")} />}
       {v?.name=="Transactions"&&<Line data={v?.data} options={options("")} />}
       {v?.name=="All-Users"&&<Doughnut data={v?.data} options={options("")} />}
       {v?.name=="All-Analysis Data"&&<PolarArea data={v?.data} options={options("")} />}
   </div>
            </div>
        )
     })}
     </div>
   
   </div>
    </div>
    
  )
}

export default Dashboard