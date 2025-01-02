import React, {useState, useRef } from 'react';
import { DayPilot, DayPilotScheduler} from "daypilot-pro-react";

import { useNavigate, useParams } from 'react-router-dom';

// toast.configure()

const Scheduler = (props) => {
    const { facilityId } = useParams()
    const navigate = useNavigate()
    const [args, setArgs] = useState();
    const [facilityList, setFacilitylist] = useState([])
    const [physicians, setPhysicians] = useState([])
    // const [facilityId, setFacilityId] = useState('')
    const [update, setUpdate] = useState(true)
    const [updata, setUpdata] = useState()
  
    var ref = useRef(component => {
        component.calendar = component && component.control;
    });
    const [state, setState] = useState({
        timeHeaders: [{ "groupBy": "Day", "format": "dddd, d MMMM yyyy" }, { "groupBy": "Hour" }, { "groupBy": "Cell", "format": "mm" }],
        scale: "CellDuration",
        cellDuration: 30,
        days: DayPilot.Date.today().daysInMonth(),
        startDate: DayPilot.Date.today(),
        showNonBusiness: true,
        timeRangeSelectingStartEndEnabled: true,
        allowEventOverlap: false,
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
            setArgs(args)
            if (args.start.value > DayPilot.Date.now()) {
                // dispatch(showConfirmScheduleAction(true))
            } else {
                // notify(false, "Not able to Schedule")
            }
        },
        eventMoveHandling: "Disabled",
        // onEventMoved: (args) => {
        //     args.control.message("Event moved: " + args.e.text());
        // },
        eventResizeHandling: "Disabled",
        // onEventResized: (args) => {
        //     args.control.message("Event resized: " + args.e.text());
        // },
        eventDeleteHandling: "Disabled",
        onEventDeleted: (args) => {
          props?.deleteModel(args, false)
         
        },
        eventDeleteHandling: "Disabled",
        onEventDeleted: (args) => {
            setArgs(args.e.data)
            // dispatch(showDeleteAction(true))
        },
        onBeforeEventRender: async (args) => {
            if (args.data.activity == "Booked" || args.data.startActivity < DayPilot.Date.now()) {
                args.data.deleteDisabled = true;
            }
        },
        eventClickHandling: "Disabled",
        eventHoverHandling: "Bubble",
        bubble: new DayPilot.Bubble({
            onLoad: (args) => {
                // if event object doesn't specify "bubbleHtml" property 
                // this onLoad handler will be called to provide the bubble HTML
                // args.html = "Event details";
                args.html = `${args.source.data.activity}`;
            }
        }),
        rowMinHeight: 50,
    },
    )
    // const getPhysician = async () => {
    //     if (facilityId && facilityId != '' && facilityId != 0) {
    //         let res = await getList(urls.physician.getAcyiveByFacility, { facilityId: facilityId })
    //         let formedList = [];
    //         if (res && res.length != 0) {
    //             await res.map((e, i) => {
    //                 let temp = {};
    //                 temp["name"] = e?.firstName + " " + e?.lastName;
    //                 temp["id"] = e?.userId
    //                 formedList.push(temp)
    //             })
    //         }
    //         setState({
    //             ...state,
    //             resources: formedList
    //         })
    //     } else {
    //         setState({
    //             ...state,
    //             resources: []
    //         })
    //     }
    // }
    
    // const setSchedule = async () => {
    //     let data = {}
    //     data['facilityId'] = facilityId;
    //     data['startActivity'] = args.start.value;
    //     data['endActivity'] = args.end.value;
    //     data['physicianId'] = args.resource;
    //     let res = await add(urls.physician.setSchedule, data)
    //     if (res.data.status) {
    //         setUpdate(!update)
    //         dispatch(showConfirmScheduleAction(false))
    //     }
    // }

    // const getScheduleList = async () => {
    //     let body = {
    //         facilityId: facilityId,
    //         activity: [],
    //         physicianId: []
    //     }
    //     // let res = await getSchedule(urls.schedule.getAll, body)
    //     setState({
    //         ...state,
    //         events: []
    //     })
    // }

    // const deleteSchedule = async () => {
    //     let res = await add(urls.schedule.delete, { id: args.id })
    //     dispatch(showDeleteAction(false))
    //     setUpdate(!update)
    // }

    // const callUpdate = () => {
    //     setUpdate(!update)
    // }

    // const getFacilityList = async () => {
    //     let res = await getfList(urls.facility.getAll)
    //     setFacilitylist(res)
    // }

    // useEffect(() => {
    //     getPhysician()
    // }, [facilityId, updata])

    // useEffect(() => {
    //     getFacilityList()
    // }, [])


    // useEffect(() => {
    //     if (facilityId && facilityId != '') {
    //         getScheduleList()
    //     }
    // }, [update, facilityId, updata])


    var { ...config } = state;
    return (
        <div className=''>
           <div className="d-flex flex-wrap py-1">
        <div className="col-md-2 px-2  ">
            <label>Select Hospital</label>
            <select className='form-select' >
                <option>1</option>
            </select>
        </div>
        <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
        
        
         
         
        </div>
      </div>
        </div>
    );
}
export default Scheduler;