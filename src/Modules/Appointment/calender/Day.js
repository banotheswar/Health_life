import React, { useEffect, useState, useRef } from 'react';

import { DayPilot, DayPilotCalendar } from "daypilot-pro-react"

import { HiChevronLeft } from "react-icons/hi"
import { HiChevronRight } from 'react-icons/hi';
import moment from 'moment';
import { notify, phoneNumberValue } from '../../../configFiles/sharedFuctions';

import { useSelector } from 'react-redux';

const DayCalendar = (props) => {

  const [day, setDay] = useState('')
  const [count, setCount] = useState(0)
 
  var ref = useRef(component => {
    component.calendar = component && component.control;
  });
  const [state, setState] = useState({
    locale: "en-us",

    columnWidthSpec: "Auto",
    viewType: "Resources",
    headerLevels: 1,
    headerHeight: 28,
    cellHeight: 28,
    cellDuration: 15,

    crosshairType: "Header",
    showCurrentTime: true,
    eventArrangement: "Cascade",
    allowEventOverlap: true,
    timeRangeSelectedHandling: "Enabled",
    startDate: DayPilot.Date.today(),
    events: props.appointments,
    cssClass: "delete-icon",

    onTimeRangeSelected: async (args) => {
     
      if (args.start.value > DayPilot.Date.now()) {
        await props?.quickdata(args)
      } else {

        notify(false, "Please select the correct Date and Time")
      }
    },
    eventDeleteHandling: "Disabled",
    onEventDeleted: (args) => {
      props.deleteModel(args, false)

    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {

      if (args.e.data.start.value > DayPilot.Date.now()) {
        props?.updateAppointmenttiming(args.e.data)
      } else {
        props.callUpdate(args.e.data)
        notify(false, "You cannot move future appointment to past!!!")
      }

    },
    handleEventResize: (args) => {
      if (!args.allowed) {
        args.allowed = false;
      }
    },

    eventResizeHandling: "Update",
    onEventResized: (args) => {

      if (args.e.cache.blockType) {
        props.callUpdate(args.e.data)
      } else {
        if ((args.e.cache.start.value > DayPilot.Date.now()) && (args.e.data.start.value > DayPilot.Date.now())) {
          props.updateAppointmenttiming(args.e.data)
        } else {
          props.callUpdate(args.e.data)

        }
      }
    },
    eventClickHandling: "Enabled",

    onEventClicked: async (args) => {
      if (args.e.part.start.value > DayPilot.Date.now()) {
        props?.quickdata(args)
        props?.openAppointmentModel(args, "active")

        props?.status("active")

      } else {
        props?.quickdata(args)
        props?.status("disable")
        props?.openAppointmentModel(args, "disable")

      }
    },
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {

        args.html = (` ${"<div class='bg-color p-1 rounded'>"}Client : ${"<b>"} ${args.source.data.clientName}${"</b>"} 
                     ${"<br />"} Patient : ${"<b>"} ${args.source.data.patientName}${"</b>"}
                      ${"<br />"} Veterinarian : ${"<b>"} Dr. ${args.source.data.veterinarianName}${"</b>"}
                       ${"<br />"}Check-In Time : ${"<b>"} ${args.source.data.checkInTime} ${"</b>"}
                       ${"<br />"}Reason: ${"<b>"} ${args.source.data.reason!=null?args.source.data.reason:""}${"</b>"} 
                        ${"<br/>"} Room : ${"<b>"} ${args.source.data.roomName}${"</b>"}
                         
                         ${"<br />"} Appointment Id : ${"<b>"} ${args.source.data.appointmentId}${"</b>"}
                         ${"<br/>"}
                         Phone : ${"<b>"} ${args.source.data.phone != null ? phoneNumberValue(args.source.data.phone) : ""}${"</b>"} ${"</div>"}`)
      },

    }),

    onBeforeEventRender: async (args) => {
     
      if (args.e.start.value < DayPilot.Date.now() || args.e.blockType) {
        args.data.deleteDisabled = true;

      }
    },
    
  })




  useEffect(() => {

    if (props?.appointments) {
      setState({
        ...state,
        events: props.appointments,

      })


    }

  }, [props?.appointments])

  useEffect(() => {
    if (props.rooms) {
      setState({
        ...state,
        columns: props.rooms,

      })
    }
  }, [props.rooms])
  var { ...config } = state;

  const nextDay = () => {
    setState({
      ...state,
      startDate: state.startDate.addDays(+1)
    })
    props?.getDates(state.startDate.addDays(+1))
  }
  const previousDay = () => {
    setState({
      ...state,
      startDate: state.startDate.addDays(-1)
    })
    props?.getDates(state.startDate.addDays(-1))
  }

  const dayvalue = () => {
    let day = state.startDate
    let formattedDate = day.toString("d MMMM yyyy")
    setDay(formattedDate)
  }

  const gotoToday = () => {
    setState({
      ...state,
      startDate: DayPilot.Date.today(),
    })
    props?.getDates(DayPilot.Date.today())
  }

  const cellRender = async (args) => {
  
      if (props?.facility==undefined||props?.dateState?.veterinarianId==0||state?.schedule?.length==0) {
       args.cell.disabled = true;
      args.cell.backColor = "#eee";
    } else  {
      
      for (let i = 0; i < state?.schedule?.length; i++) {
       
        if (args.cell.start.value == state?.schedule[i]?.StartActivity) {
          args.cell['schedule'] = state.schedule[i].ScheduleId
          args.cell.backColor = "#fff";
          return
        } 
        else if (i == state?.schedule.length - 1) {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }
      }
    }
  }

  const settingColumns = () => {
    let columnsarray = []
    props?.rooms?.map((e) => {
      let newObj = {}

      let l = (props?.appointments?.filter(v => v.appointmentId && v?.resource == e?.id && (new DayPilot.Date(v?.startTime))?.toString("ddMMyyyy") == ((state?.startDate)?.toString("ddMMyyyy"))))?.length
      newObj['name'] = e.name + "&nbsp;<b> (" + l + ") </b>"
      newObj['id'] = e.id
      columnsarray.push(newObj)
    })

    setState({
      ...state,

      columns: columnsarray,
      events: props?.appointments,
      schedule: props.schedule
    })
  }



  useEffect(() => {
    dayvalue()
  }, [state.startDate])

// useEffect(()=>{
 
//   if(state.schedule){
   
//     setState({
//       ...state,
     
//       // onBeforeCellRender: async (args) => {
//       //   cellRender(args)
//       // }
//     })
//   }
 
// },[state.schedule,props.schedule])
useEffect(()=>{
 
if(props?.dateState&&props?.dateState!=""){
state["startDate"]=new DayPilot.Date(props?.dateState)
 
}
},[props?.dateState])
  

  useEffect(() => {

    setCount((props?.appointments?.filter(v => v.appointmentId && (new DayPilot.Date(v?.startTime))?.toString("ddMMyyyy") == ((state?.startDate)?.toString("ddMMyyyy"))))?.length)
  }, [state.startDate, props?.appointments])



  useEffect(() => {
    settingColumns();


  }, [state.startDate, state.events, props.rooms, props?.appointments, props?.schedule])

  return (
    <div className=''>
      <div className='d-flex justify-content-around align-items-center pb-2 ' style={{ marginLeft: "110px", marginRight: "170px" }} >


        <div className=''><div className=' border border btn-bg py-1 px-2 pointer' onClick={() => { gotoToday() }}>Today</div></div>

        <div className='d-flex align-items-center '> <HiChevronLeft onClick={() => { previousDay() }} size={30} /><div className=''>{moment(day).format("MMMM,DD YYYY")}</div><HiChevronRight onClick={() => { nextDay() }} size={30} /></div>
        <div className='text-primary'>Appointments : {count}</div>

      </div>
      <div className='calendar-event'>
      {props?.schedule?.length>0&&<DayPilotCalendar
      
      {...config}
      onBeforeCellRender={async (args) => {
      
        cellRender(args)
        
      }}
      ref={ref}
      timeFormat="Clock24Hours"
      
    />} 
    {props?.schedule?.length==0&&<DayPilotCalendar
      
      {...config}
      onBeforeCellRender={async (args) => {
      
        cellRender(args)
        
      }}
      ref={ref}
      timeFormat="Clock24Hours"
      
    />} 
        
      </div>


    </div>
  );
}
export default DayCalendar
