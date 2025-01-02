import React, { useEffect, useState } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from "react-select"
import moment from 'moment'
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'
import { MdDateRange } from 'react-icons/md'
import { IoIosTime } from 'react-icons/io'
const CreateAvailability = (props) => {
   const {facilityList,doctorList,availablityList} =props;
 const submit = async () => {
    let body = {
       startActivity: moment(new Date(data?.startActivity).toLocaleString()).format(),
      endActivity:moment(new Date(data?.endActivity).toLocaleString()).format(),
      startTime:moment(new Date(data?.startTime).toLocaleString()).format("YYYY-MM-DDTHH:mm:ss"),
      endTime: moment(new Date(data?.endTime).toLocaleString()).format("YYYY-MM-DDTHH:mm:ss"),
      doctor: data?.doctor,
      facility: data?.facility,
      }
       body["id"]=doctorList?.filter((v)=>v?.id==data?.doctor?.value)[0]?.id
       body["item"]="New"
       props?.submit(body)
       
 };

  const returnErrorCss = (key) => {
    return errors && errors?.[key] && errors?.[key] ? "form-control bg-white border border-danger py-2" : "form-control bg-white py-2"
  }
  const returnErrorCssMultiple = (key) => {
    return errors && errors?.[key] && errors?.[key] ? "border border-danger rounded " : " "

  }
  const { data, errors,setValues, handleChangeSearch, handleDateChange, handleSubmit, handleTimeChange, } = UseFormValidations({
    initialValues: {
      facility: "",
      doctor:"",
      startActivity: "",
      endActivity: "",
      startTime: "",
      endTime: "",
     },
    validationSchema: {
        facility: {
        required: {
          value: true,
          message: "Please enter your email id",
        },

      },
      doctor: {
        required: {
          value: true,
          message: "Please enter your password",
        },
      },
      startActivity: {
        required: {
          value: true,
          message: "Please enter your password",
        },

      },

      endActivity: {
        required: {
          value: true,

          message: "Please enter your password",
        },

      },
      startTime: {
        required: {
          value: true,
          message: "Please enter your password",
        },
      },
      endTime: {
        required: {
          value: true,
          message: "Please enter your password",
        },
      },

    },
    submit: submit,
  })
 
  const [disabledTimes, setDisabledTimes] = useState([]);
  const timeInterval = 15;

  const updateDisabledTimes = () => {
    const newDisabledTimes = [];
    const minutesInDay = 24 * 60;
    let newStartTime = new Date(data?.startTime)
    for (let i = 0; i < minutesInDay; i += timeInterval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;

      if (newStartTime.getHours() > hours || (newStartTime.getHours() === hours && newStartTime.getMinutes() >= minutes)) {
        newDisabledTimes.push(new Date(newStartTime.getFullYear(), newStartTime.getMonth(), newStartTime.getDate(), hours, minutes));
      }
    }

    setDisabledTimes(newDisabledTimes);
  };
  useEffect(() => {
    updateDisabledTimes()

  }, [data?.startTime])
 
  useEffect(()=>{
if(props?.show?.id){
  let res=availablityList?.filter((v)=>v?.id==props?.show?.id)[0];
  console?.log(res,"props?.show")
  setValues(res)
}
  },[props?.show])
  console?.log(data,"props?.show",availablityList)
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <form onSubmit={handleSubmit}>
          <div>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Availability
              </Modal.Title>
              
            </Modal.Header>
          </div>
          <Modal.Body >

            <div className="row">
              <div className="col-md-6 ">
                <label>
                  Select Facility <span className="text-danger">*</span>
                </label>
                <Select
                  options={facilityList?.map(v=>{return {label:v?.facilityName,value:v?.id}})}
                  value={data?.facility}
                  name="facility"
                  className={returnErrorCssMultiple("facility")}
                  placeholder="Select Facility"
                  onChange={handleChangeSearch("facility")}
                />
              </div>
              <div className="col-md-6 ">
                <label>
                  Select Doctor <span className="text-danger">*</span>
                </label>
                <Select
                value={data?.doctor}
                  options={doctorList?.filter((v)=>(v?.facility?.label||v?.facility)==data?.facility?.label)?.map(({firstName,lastName,id})=>{return {label:firstName+" "+lastName,value:id}})}
                  className={returnErrorCssMultiple("doctor")}
                  name="userId"
                  placeholder="Select Doctor"
                  onChange={handleChangeSearch("doctor")}
                />
              </div>
              

              <div className="col-md-6 py-3">
                <label>
                  Start Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  className={returnErrorCss("startActivity")}
                  selected={
                    data?.startActivity ? new Date(data?.startActivity) : ""
                  }
                  minDate={new Date()}
                  onChange={(e) => {
                    handleDateChange(e, "startActivity");
                  }}
                  showIcon
                  
                  icon={<MdDateRange size={25} className='mt-1'/>}
                  autoComplete="off"
                  name="startActivity"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Start Date"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  style={{ fontSize: "20px" }}
                  dropdownMode="select"
                />
              </div>
              <div className="col-md-6 py-3">
                <label>
                  End Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  className={returnErrorCss("endActivity")}
                  selected={data?.endActivity ? new Date(data?.endActivity) : ""}
                  minDate={new Date(data?.startActivity)}
                  showIcon
                  
                  icon={<MdDateRange size={25} className='mt-1'/>}
                  onChange={(e) => { handleDateChange(e, "endActivity") }}
                  autoComplete="off"
                  name="endActivity"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="End Date"
                  popperClassName="react-datepicker-popper"
                  showMonthDropdown
                  showYearDropdown
                  style={{ fontSize: "20px" }}
                  dropdownMode="select"
                />
              </div>

              <div className='col-md-6'>
                <label>

                  Start Time <span className="text-danger">*</span>
                </label>

                <DatePicker

                  id="timePicker"
                  selected={data?.startTime && data?.startTime != undefined ? data?.startTime : ""}
                  onChange={(e) => {
                    handleTimeChange(e, "startTime");
                  }}
                  showIcon
                  
                  icon={<IoIosTime size={25} className='mt-1'/>}
                 autoComplete="off"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={timeInterval}
                  dateFormat="h:mm aa"
                  placeholderText="Start Time"
                  className={returnErrorCss("startTime")}
                />

              </div>
              <div className='col-md-6'>
                <label>
                  End Time <span className="text-danger">*</span>
                </label>
                <DatePicker
showIcon
                  
icon={<IoIosTime size={25} className='mt-1'/>}
                  id="timePicker"
                  selected={data?.endTime && data?.endTime != "" ? data?.endTime : ""}
                  onChange={(e) => { handleTimeChange(e, "endTime") }}
                  showTimeSelect
                  showTimeSelectOnly
                    autoComplete="off"
                  timeIntervals={timeInterval}
                  dateFormat="h:mm aa"
                  placeholderText="End Time"
                  popperPlacement='right'
                  className={returnErrorCss("endTime")}
                  excludeTimes={disabledTimes}
                />

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
    </div>
  )
}

export default CreateAvailability