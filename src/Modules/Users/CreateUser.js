import React, { useEffect, useState } from 'react'
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const CreateUser = (props) => {
    const [roles,setRoles]=useState([])
    const [org,setOrg]=useState([])
    const submit=()=>{
        data["userId"]=data?.userId?data?.userId:0
        
        props?.submit(data)
    }
    // const getAllrole=async()=>{
    //     let res= await GetListById(url.getAllRoles,{id:0});
    //     setRoles(res)
    // }
    const {data,errors,handleChange,handleAlphabetChange,handleNumberChange,handleSubmit,setValues,handleDataChange}=UseFormValidations({
        initialValues: {
            roleId:"",
            firstName: "",
            lastName: "",
            email:"",
            phone:"",
            dob:"",
            gender:"",
            organizationId:sessionStorage.getItem("organizationId")||0
           
          },
          validationSchema: {
            roleId: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
            
            firstName: {
              required: {
                value: true,
                message: "Please enter your First Name",
              },
            },
            lastName: {
              required: {
                value: true,
                message: "Please enter your First Name",
              },
            },
            email: {
                required: {
                    value: true,
                    message: "Please enter a valid Email",
                },
                pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Please enter a valid email id",
                },
              },
              phone: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
                minlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
                maxlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
              },
              dob: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
              gender: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
           
             
          },
        submit:submit
    })
    const returnValue=(key)=>{
        return data?.[key]&&data?.[key]?data?.[key]:""
    }
    const ErrorValue=(key,select)=>{
    return errors?.[key]&&errors?.[key]?`form-control border border-danger ${select}` :`form-control py-2 ${select}`
    }
    const getAllOrg=async()=>{
      let res=await GetListById(url?.getAllOrg,{id:0})
      setOrg(res)
    }
    useEffect(()=>{
      if(sessionStorage.getItem("roleId")==1){
        let res=props?.role?.filter((v)=>props?.show?.userId?v.roleId>1:v.roleId==2)
        console?.log(res,"res")
        setRoles(res)
      }
      if(sessionStorage.getItem("roleId")==2){
        let res=props?.role?.filter((v)=>v.roleId!=1)
        console?.log(res,"res")
        setRoles(res)
      }
      
     
    },[props?.role])
    useEffect(()=>{
        if (props?.show?.userId){
            setValues(props?.show)
        }
    },[props?.show?.userId])
    useEffect(()=>{
      getAllOrg()
    },[])
   
    console?.log(data)
  return (
    <Modal  {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>{props?.show?.userId?"Edit User":"Add User"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
     <div className="col-md-4">
    <label>Role <span className='text-danger'>*</span></label>
    <select disabled={props?.show?.userId} className={ErrorValue("roleId","form-select")} placeholder='Role' value={returnValue("roleId")} onChange={handleChange("roleId")}>
        <option>Select</option>
        {roles?.map(v=><option value={v?.roleId}>{v?.roleName}</option>)}
    </select>

</div>
{sessionStorage.getItem("roleId")==1&&<div className="col-md-4">
    <label>Organization</label>
    <select  className={`${ErrorValue("organizationId","form-select")}`} placeholder='organizationId' value={returnValue("organizationId")} onChange={handleChange("organizationId")}>
        <option>Select</option>
        {org?.map(v=><option value={v?.organizationId}>{v?.organizationName}</option>)}
    </select>

</div>}
<div className="col-md-4">
    <label>First Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("firstName")} placeholder='First Name' value={returnValue("firstName")} onChange={handleAlphabetChange("firstName")}/>

</div>
<div className="col-md-4">
    <label>Last Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("lastName")} placeholder='Last Name' value={returnValue("lastName")} onChange={handleAlphabetChange("lastName")}/>

</div>
<div className="col-md-4">
    <label>E-Mail <span className='text-danger'>*</span></label>
    <input className={ErrorValue("email")} placeholder='E-Mail' value={returnValue("email")} onChange={handleChange("email")}/>

</div>
<div className="col-md-4">
    <label>Phone <span className='text-danger'>*</span></label>
    <input className={ErrorValue("phone")} placeholder='Phone' value={returnValue("phone")} maxLength={10} onChange={handleChange("phone")}/>

</div>
<div className="col-md-4">
    <label>DOB <span className='text-danger'>*</span></label>
    <DatePicker className={ErrorValue("dob")}
    peekNextMonth
      showMonthDropdown
      showYearDropdown  scrollableYearDropdown placeholderText='DOB' selected={data?.dob?new Date(data?.dob):""} onChange={(e)=>handleDataChange("dob",e)} />
</div>
<div className="col-md-4">
    <label>Gender <span className='text-danger'>*</span></label>
    <select className={ErrorValue("gender","form-select")} placeholder='Gender' value={returnValue("gender")} onChange={handleChange("gender")}>
        <option value={""}>Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
    </select>

</div>
<div className="col-md-4">
    <label>Weight (Kgs)</label>
    <input type='number' className={ErrorValue("weight")} placeholder='Weight' value={returnValue("weight")}  onChange={handleNumberChange("weight")}/>

</div>
<div className="col-md-4">
    <label>Height (cm) </label>
    <input type='number' className={ErrorValue("height")} placeholder='Height' value={returnValue("height")}  onChange={handleNumberChange("height")}/>

</div>
{/* <div className="col-md-12">
    <label>Address </label>
    <textarea className={ErrorValue("address")} placeholder='Address' value={returnValue("address")} onChange={handleChange("address")}/>

</div> */}



     </div>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn border px-5' onClick={()=>props?.onHide()} >
        Close
      </button>
      <button className='bg_btn btn text-white px-5'>
        Save 
      </button>
    </Modal.Footer>
   </form>
  </Modal>
  )
}

export default CreateUser