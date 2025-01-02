import React, { useEffect, useState, useRef } from 'react';
import { DayPilot, DayPilotMonth } from "daypilot-pro-react";

import { HiChevronLeft } from "react-icons/hi"
import { HiChevronRight } from "react-icons/hi"
import moment from 'moment';
import { phoneNumberValue } from '../../../configFiles/sharedFuctions';


const Month = (props) => {
  const [day, setDay] = useState('')
  const [count, setCount] = useState(0)
  
  var ref = useRef(component => {
    component.calendar = component && component.control;
  });
  const [state, setState] = useState(
    {
      locale: "en-us",
      viewType: "Month",
      showWeekend: true,
      timeRangeSelectedHandling: "Enabled",
      startDate: DayPilot.Date.today(),
      events: props.appointments,
    
      onTimeRangeSelected: async (args) => {
        // props?.monthDay(args.start.value)
        props?.monthDay(args.start.value)
        props?.day("day")
        // notify(false, "Please go to week or day view to Create appointment")
      },
      eventDeleteHandling: "Disabled",
      onEventDeleted: (args) => {
        props.deleteModel(args, true)
        // args.control.message("Event deleted: " + args.e.text());
      },
      eventMoveHandling: "Disabled",
      eventResizeHandling: "Disabled",
      eventClickHandling: "Enabled",
      onEventClicked: (args) => {
        // if (args.e.data.blockType) {
        //   notify(false, "This is a Block")
        // } else {
        //   props.openAppointment(args)
        // }
        // props?.monthDay(args)
        // props?.day("day")
        // args.control.message("Event clicked: " + args.e.text());
      },
      onBeforeEventRender: async (args) => {
        if (args.e.start < DayPilot.Date.now() || args.e.blockType) {
          args.data.deleteDisabled = true;
        }
      },
      eventHoverHandling: "Bubble",
          bubble: new DayPilot.Bubble({
            onLoad: (args) => {
                     args.html = (` ${"<div class='bg-color p-1 rounded'>"} Client : ${"<b>"} ${args.source.data.clientName }${"</b>"} ${"<br />"} 
                     Patient : ${"<b>"} ${args.source.data.patientName }${"</b>"} ${"<br />"}
                      Veterinarian : ${"<b>"} Dr. ${args.source.data.veterinarianName}${"</b>"} 
                      ${"<br />"}Check-In time : ${"<b>"} ${args.source.data.checkInTime} ${"</b>"} ${"<br/>"}
                      Reason: ${"<b>"} ${args.source.data.reason!=null?args.source.data.reason:""}${"</b>"}${"<br/>"}
                       Room : ${"<b>"} ${args.source.data.roomName}${"</b>"} 
                       ${"<br />"} Appointment Id : ${"<b>"} ${args.source.data.appointmentId}${"</b>"}
                       ${"<br/>"} Phone : ${"<b>"} ${args.source.data.phone!=null?phoneNumberValue(args.source.data.phone):""}${"</b>"}  ${"</div>"}`)},
                 
          }),
    }
  )
  useEffect(() => {
    if (props.appointments) {
      setState({
        ...state,
        events: props.appointments
      })
    }
  }, [props.appointments])
  const nextMonth = () => {
    setState({
      ...state,
      startDate: state.startDate.addMonths(+1)
    })
  }
  const previousMonth = () => {
    setState({
      ...state,
      startDate: state.startDate.addMonths(-1)
    })
  }

  const dayvalue = () => {
    let day = state.startDate
    let formattedDate = day.toString("MMMM yyyy")
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
    setCount((props.appointments?.filter(v =>v.appointmentId && (new DayPilot.Date(v.startTime).toString("MMMMyyyy")) == (state.startDate).toString("MMMMyyyy")))?.length)
  }, [state.startDate, state.events])
  var { ...config } = state;
  return (
    <div >
      <div className=' d-flex justify-content-around align-items-center pb-2' style={{ marginLeft: "110px",marginRight: "170px" }}>
     
        <div><button className=' border border btn-bg py-1 px-2' onClick={() => { gotoToday() }}>Today</button></div>
        <div className='d-flex align-items-center'> <HiChevronLeft onClick={() => { previousMonth() }} size={30} />{moment(day)?.format("MMMM YYYY")}<HiChevronRight onClick={() => { nextMonth() }} size={30} /></div>
        <div className='text-primary'>Appointments : {count}</div>
        
      </div>
      < DayPilotMonth
        {...config}
        ref={ref}
      />
    </div>
  );
}

export default Month;
