import React, { useEffect, useState, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import { getList, notify, phoneNumberValue } from '../../../configFiles/sharedFuctions';
import { toast } from 'react-toastify';
import { HiChevronLeft } from "react-icons/hi"
import { HiChevronRight } from 'react-icons/hi';
import moment from 'moment';
import { useSelector } from 'react-redux';


const WeekCalendar = (props) => {
  
  const [day, setDay] = useState('')
  const [count, setCount] = useState(0)
  let facilityState=useSelector((state)=>state?.facilityGlobally)
  
  var ref = useRef(component => {
    component.calendar = component && component.control;
  });
  const [state, setState] = useState(
    {
      viewType: "Week",
   headerDateFormat: "ddd M/d/yyyy",
      headerHeight: 28,
     
      cellHeight: 28,
      // dayBeginsHour: 9,
      // dayEndsHour: 18,
      cellDuration: 15,
      timeRangeSelectedHandling: "Enabled",
      startDate: DayPilot.Date.today(),
      
      
      events: props?.appointments,
      dataState: props?.dataState,
      onTimeRangeSelected: async (args) => {
        
        
        
        if (args.start.value > DayPilot.Date.now()) {
          props?.quickdata(args)
          
        } else {
          notify(false, "Please select the correct Date and Time")
          
          
        }
       
        

      },
      
       handleEventResize:(args)=> {
       
        if (!args.allowed) {
          args.allowed = false;
        }
      },
      eventDeleteHandling: "Disabled",
      onEventDeleted: (args) => {
        props.deleteModel(args, true)
        
      },
      eventMoveHandling: props.com == "AllAppointment" ? "Update" : "disabled",
      onEventMoved: (args) => {
        if (args.e.data.start.value > DayPilot.Date.now()) {
          props?.updateAppointmenttiming(args.e.data)
        } else {
          props.callUpdate(args.e.data)
          notify(false, "You cannot move future appointment to past!!!")
        }
      },
      eventResizeHandling: props.com == "AllAppointment" ? "Update" : "disabled",
      onEventResized: (args) => {
        if ((args.e.cache.start.value > DayPilot.Date.now()) && (args.e.data.start.value > DayPilot.Date.now())) {
          props.updateAppointmenttiming(args.e.data)
        } else {
          props.callUpdate(args.e.data)
         
        }
        
      },
      eventClickHandling: "Enabled",
      onEventClicked: async (args) => {
       
        if (args.e.part.start.value > DayPilot.Date.now()) {
         
          props?.openAppointmentModel(args,"active")
          
        } else {
          
          props?.openAppointmentModel(args,"disable")
         
        }
        
      },
      eventHoverHandling: "Bubble",
          bubble: new DayPilot.Bubble({
            onLoad: (args) => { 
                     args.html = (`${"<div class='bg-color p-1 rounded'>"}Client : ${"<b>"} ${args.source.data.clientName }${"</b>"} ${"<br />"} Patient : ${"<b>"} ${args.source.data.patientName }${"</b>"} ${"<br />"} Veterinarian : ${"<b>"} Dr. ${args.source.data.veterinarianName}${"</b>"} ${"<br />"}Check-In time : ${"<b>"} ${args.source.data.checkInTime} ${"</b>"} ${"<br/>"}
                      Room : ${"<b>"} ${args.source.data.roomName}${"</b>"}${"<br />"}
                      Reason: ${"<b>"} ${args.source.data.reason!=null?args.source.data.reason:""}${"</b>"}${"<br/>"}
                        Appointment Id : ${"<b>"} ${args.source.data.appointmentId}${"</b>"}
                        ${"<br/>"}Phone : ${"<b>"} ${args.source.data.phone!=null?phoneNumberValue(args.source.data.phone):""}${"</b>"}  ${"</div>"}`)},
                 
          }),
      onBeforeEventRender: async (args) => {
        if (args.e.start.value < DayPilot.Date.now() || args.e.blockType) {
          args.data.deleteDisabled = true;
        }
      },
      onBeforeCellRender: async (args) => {
        cellRender(args)
      }

    }
  )

  useEffect(() => {
    if (props.dataState) {
      setState({
        ...state,
        dataState: props.dataState
      })
    }
  }, [props.dataState])


  useEffect(() => {
    if (props?.appointments) {
      setState({
        ...state,
        events: props.appointments
      })
    }
  }, [props.appointments])
  var { ...config } = state;

  const nextWeek = () => {
    setState({
      ...state,
      startDate: state.startDate.addDays(+7)
    })
  }
  const previousWeek = () => {
    setState({
      ...state,
      startDate: state.startDate.addDays(-7)
    })
  }

  const cellRender = async (args) => {
    // if (props.dataState.facility == undefined || props.dataState.veterinarianId.length != 1 || props.schedule.length == 0) {
      if (props?.facilityId==undefined || props.schedule.length == 0) {
      if (props?.com == "AddAppointment" && props?.schedule?.length > 0) {
        for (let i = 0; i < props?.schedule.length; i++) {
          if (args.cell.start.value == props.schedule[i].StartActivity) {
            args.cell['schedule'] = props.schedule[i].ScheduleId
            return
          } else if (i == props.schedule.length - 1) {
            args.cell.disabled = true;
            args.cell.backColor = "#fff";
          }
        }
      } else {
        args.cell.disabled = true;
        args.cell.backColor = "#eee";
      }
    } else if (props.dataState.veterinarianId.length !=0) {
      args.cell.backColor = "#fff";
      for (let i = 0; i < props.schedule.length; i++) {
        if (args.cell.start.value == props.schedule[i].StartActivity) {
          args.cell['schedule'] = props.schedule[i].ScheduleId
          return
        } else if (i == props.schedule.length - 1) {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }
      }
    }
  }



  useEffect(() => {
    setState({
      ...state,
      onBeforeCellRender: async (args) => {
        cellRender(args)
      }
    })
  }, [props.schedule])

  const dayvalue = () => {
    let day = state?.startDate
    let formattedDate = day?.toString("d MMMM yyyy")
    setDay(formattedDate)
  }
  const gotoToday = () => {
    setState({
      ...state,
      startDate: DayPilot.Date.today(),
    })
    
  }

 

  useEffect(() => {
    dayvalue()
    props?.monthDay("")
  }, [state.startDate])



  useEffect(() => {
    setCount((props?.appointments?.filter(v => v.appointmentId && ((new DayPilot.Date(v?.startTime) > state?.startDate?.firstDayOfWeek()) && (new DayPilot.Date(v?.startTime) < state?.startDate?.firstDayOfWeek()?.addDays(7)))))?.length)
  }, [state.startDate, state.events])

  

  return (
    <div>
      <div className='d-flex justify-content-around align-items-center pb-2' style={{ marginLeft: "110px",marginRight: "170px" }}>
     
        
      
        <div><button className=' border border btn-bg py-1 px-2' onClick={() => { gotoToday() }}>Today</button></div>
        <div className='d-flex align-items-center'> <HiChevronLeft onClick={() => { previousWeek() }} size={30} />{moment(day).format("MMMM,DD YYYY")}<HiChevronRight onClick={() => { nextWeek() }} size={30} /></div>
        <div className='text-primary'>Appointments : {count}</div>
        
        
      </div>
      <DayPilotCalendar
        
        {...config}
        ref={ref}
        timeFormat="Clock24Hours"
      />
    </div>
  );
}

export default WeekCalendar;
