import React, { useEffect } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import Select from "react-select"
import { checkRole } from '../../components/ShareComp'
import { useSelector } from 'react-redux'
const AddRoom = (props) => {
  const state=useSelector((state)=>state?.facilityList)
  const {facilityList,blockList,floorList}=useSelector((state)=>state);
    const submit=()=>{
        data["id"]=props?.show?.id?props?.show?.id:state?.length+1
        data["item"]=props?.show?.id?"Exist":"New";
        data["block"]=data?.block?.label
        data["floor"]=data?.floor?.label
        data["facilityName"]=data?.facilityName?.label
        
        props?.submit(data);
    }
  
    const {data,errors,handleChange,handleChangeSearch,handleSubmit,setValues}=UseFormValidations({
      initialValues: {
        facilityName: "",
        block: "",
        floor: "",
        roomNo:"",
      },
      validationSchema: {
        facilityName: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        block: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        floor: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        roomNo: {
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
    const ErrorValue=(key)=>{
    return errors?.[key]&&errors?.[key]?" border border-danger rounded":""
    }
    useEffect(()=>{
        if (props?.show?.id){
      const {block,floor,facilityName,roomNo,description,status}=props?.show;
      let obj={}
      obj["block"]={label:block,value:block}
      obj["floor"]={label:floor,value:floor}
      obj["facilityName"]={label:facilityName,value:facilityName}
      obj["roomNo"]=roomNo
      obj["description"]=description
      obj["status"]=status
     
console?.log(obj,"obj")

setValues(obj)       
        }
    },[props?.show])
    console?.log(data,"data",props?.show)
  return (
    <Modal  {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>{props?.show?.id?"Edit Room":"Add Room"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
     <div>
    <label>Select Facility<span className='text-danger'>*</span></label>
   <Select placeholder="Select..." value={data?.facilityName} className={ErrorValue("facilityName")} options={facilityList?.map(v=>({label:v?.facilityName,value:v?.facilityName}))} onChange={handleChangeSearch("facilityName")}/>

</div>
<div>
    <label>Select Block<span className='text-danger'>*</span></label>
   <Select placeholder="Select..."value={data?.block} options={blockList} onChange={handleChangeSearch("block")}className={ErrorValue("block")}/>

</div>
<div>
    <label>Select Floor<span className='text-danger'>*</span></label>
   <Select placeholder="Select..."value={data?.floor} options={floorList} onChange={handleChangeSearch("floor")}className={ErrorValue("floor")}/>

</div>
<div>
    <label>Room No<span className='text-danger'>*</span></label>
    <input className={`${ErrorValue("roomNo")} form-control`} placeholder='Enter'value={returnValue("roomNo")} onChange={handleChange("roomNo")} />
   

</div>

<div>
    <label>Description</label>
    <textarea className={`${ErrorValue("description")} form-control`} placeholder='Description'value={returnValue("description")} onChange={handleChange("description")}/>
    
</div>
     </div>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn border px-5' onClick={()=>props?.onHide()} >
        Close
      </button>
     { !checkRole()&&<button className='bg_btn btn text-white px-5'>
        Save 
      </button>}
    </Modal.Footer>
   </form>
  </Modal>
  )
}

export default AddRoom