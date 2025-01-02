import { Modal } from 'react-bootstrap'
import React, { useEffect } from 'react'
import Select from "react-select"
import { UseFormValidations } from '../../validations/UseFormValidation'

const Add = (props) => {
const list=[
   {label: "All analytics features",value:"1"},
   { label:"Up to 250,000 tracked visits",value:"2"},
    {label:"Normal support",value:"3"},
    {label:"Up to 3 team members",value:"4"}
]
const submit=()=>{
    data["id"]=data?.id?data?.id:0
    data["services"]=JSON.stringify(data?.services)
    props?.submit(data)
}
const {data,errors,handleChange,handleNumberChange,handleAlphabetChange,handleMultiSelectDropdown,handleSubmit,setValues}=UseFormValidations({
  initialValues: {
    packageName: "",
    amount: "",
    scansCount: "",
    // services:""
  },
  validationSchema: {
    packageName: {
      required: {
        value: true,
        message: "Please enter your First Name",
      },
    },
    amount: {
      required: {
        value: true,
        message: "Please enter your First Name",
      },
    },
    scansCount: {
      required: {
        value: true,
        message: "Please enter your First Name",
      },
    },
    
  },
    submit:submit
})
console?.log(data,"data")
const returnValue=(key)=>{
    return data?.[key]&&data?.[key]?data?.[key]:""
}
const ErrorValue=(key)=>{
return errors?.[key]&&errors?.[key]?" form-control border border-danger":"form-control"
}
useEffect(()=>{
    if (props?.show?.id){
        setValues(props?.show)
    }
},[props?.show?.id])
  return (
    <Modal  {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>{props?.show?.id?"Edit Package":"Add Package"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
<div>
    <label>Package Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("packageName")} placeholder='Name' value={returnValue("packageName")} onChange={handleAlphabetChange("packageName")}/>

</div>
<div>
    <label>Amount <span className='text-danger'>*</span></label>
    <input className={ErrorValue("amount")} placeholder='Amount'value={returnValue("amount")} onChange={handleNumberChange("amount")}/>
    
</div>
<div>
    <label>Scans Limit <span className='text-danger'>*</span></label>
    <input className={ErrorValue("scansCount")} placeholder='Scans Limit'value={returnValue("scansCount")} onChange={handleNumberChange("scansCount")}/>
    
</div>
<div>
<label>What's Includes</label>
<Select  isMulti options={list} value={returnValue("services")} onChange={handleMultiSelectDropdown("services")}/>
</div>
<div>
    <label>Discription</label>
    <textarea className={ErrorValue("description")} placeholder='Description'value={returnValue("description")} onChange={handleChange("description")}/>
    
</div>
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

export default Add