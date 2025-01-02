import React, { useEffect, useState } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'

const CreateOrg = (props) => {
  const [obj,setObj]=useState({})
  const submit=()=>{
   
   let body={
    organizationId:data?.organizationId?data?.organizationId:0,
    organizationName:data?.organizationName,
    shortName:data?.shortName,
   }
    props?.submit(body)
}
const {data,errors,handleChange,handleNumberChange,handleAlphabetChange,handleSubmit,setValues}=UseFormValidations({
  initialValues:{
    organizationName:"",
    shortName:""

  },
  validationSchema:{
    organizationName: {
      required: {
        value: true,
        message: "Please select specialityName",
      },
    },
    shortName: {
      required: {
        value: true,
        message: "Please select specialityName",
      },
    },

  },
    submit:submit
})
const returnValue=(key)=>{
    return data?.[key]&&data?.[key]?data?.[key]:""
}
const ErrorValue=(key)=>{
return errors?.[key]&&errors?.[key]?" form-control border border-danger p-2":"form-control p-2"
}
const getById=async(id)=>{
  let res=await GetListById(url.orgGetById,{id:id})
  setObj(res)
}
console?.log(obj,"obj")
useEffect(()=>{
  setValues(obj)
},[obj])
useEffect(()=>{
    if (props?.show?.organizationId){
      getById(props?.show?.organizationId)
       
    }
},[props?.show?.organizationId])
return (
<Modal  {...props}
size="md"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header >
  <Modal.Title>{props?.show?.organizationId?"Edit":"Add"}</Modal.Title>
</Modal.Header>
<form onSubmit={handleSubmit}>
<Modal.Body>
 <div className='row'>
<div>
<label>Organization Name <span className='text-danger'>*</span></label>
<input className={ErrorValue("organizationName")} placeholder='Organization Name' value={returnValue("organizationName")} onChange={handleAlphabetChange("organizationName")}/>

</div>
<div className='py-3'>
<label>Short Name <span className='text-danger'>*</span></label>
<input className={ErrorValue("shortName")} placeholder='Short Name' value={returnValue("shortName")} onChange={handleAlphabetChange("shortName")}/>

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

export default CreateOrg