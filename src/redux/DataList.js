export const facilityList=[
    {
      id: 1,
      facilityName: "Sunrise Medical Center",
      shortName: "SMC",
      address: "123 Main St, Springfield, IL",
      status:"Active"
    },
    {
      id: 2,
      facilityName: "Green Valley Hospital",
      shortName: "GVH",
      address: "456 Elm St, Green Valley, CA",
    },
    {
      id: 3,
      facilityName: "Horizon Health Clinic",
      shortName: "HHC",
      address: "789 Pine St, Horizon City, TX",
    },
    {
      id: 4,
      facilityName: "Riverside Wellness Center",
      shortName: "RWC",
      address: "101 River Rd, Riverside, WA",
    },
    {
      id: 5,
      facilityName: "Mountain View Care Center",
      shortName: "MVCC",
      address: "202 Summit St, Mountain View, CO",
    },
    {
      id: 6,
      facilityName: "Lakeside Medical Plaza",
      shortName: "LMP",
      address: "303 Lake St, Lakeside, FL",
    },
    {
      id: 7,
      facilityName: "Valley Forge Health Center",
      shortName: "VFHC",
      address: "404 Forge Ln, Valley Forge, PA",
    },
    {
      id: 8,
      facilityName: "Ocean Breeze Clinic",
      shortName: "OBC",
      address: "505 Coastal Hwy, Ocean Breeze, NC",
    },
  ];
  export const roomList = [
    {
      id: "1",
      facilityName: "Library",
      block: "A",
      floor: 1,
      roomNo: "101",
      description: "Main library with study area and books.",
      status: "Active"
    },
    {
      id: "2",
      facilityName: "Gym",
      block: "B",
      floor: 2,
      roomNo: "202",
      description: "Fully equipped gym for fitness.",
      status: "Active"
    },
    {
      id: "3",
      facilityName: "Cafeteria",
      block: "C",
      floor: 1,
      roomNo: "103",
      description: "Cafeteria with healthy food options.",
      status: "Active"
    },
    {
      id: "4",
      facilityName: "Auditorium",
      block: "D",
      floor: 4,
      roomNo: "401",
      description: "Auditorium for events and presentations.",
      status: "Active"
    },
    {
      id: "5",
      facilityName: "Computer Lab",
      block: "A",
      floor: 2,
      roomNo: "202",
      description: "Lab with high-speed computers.",
      status: "Active"
    },
    {
      id: "6",
      facilityName: "Swimming Pool",
      block: "B",
      floor: 1,
      roomNo: "105",
      description: "Olympic-size swimming pool.",
      status: "Active"
    },
    {
      id: "7",
      facilityName: "Music Room",
      block: "C",
      floor: 3,
      roomNo: "303",
      description: "Room equipped with musical instruments.",
      status: "Active"
    },
    {
      id: "8",
      facilityName: "Science Lab",
      block: "D",
      floor: 2,
      roomNo: "203",
      description: "Lab with advanced equipment for experiments.",
      status: "Active"
    }
  ];
  
  export const specialties = [
    { id: 1, img:"", status: "Active", name: "Cardiology" },
    { id: 2, img:"", status: "Active", name: "Dermatology" },
    { id: 3, img:"", status: "Active", name: "Neurology" },
    { id: 4, img:"", status: "Active", name: "Pediatrics" },
    { id: 5, img:"", status: "Active", name: "Orthopedics" },
    { id: 6, img:"", status: "Active", name: "Gynecology" },
    { id: 7, img:"", status: "Active", name: "Oncology" },
    { id: 8, img:"", status: "Active", name: "Psychiatry" },
    { id: 9, img:"", status: "Active", name: "Radiology" },
    { id: 10,img:"", status: "Active",  name: "General Surgery" }
  ];
  export  const doctors = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        dob: "1980-01-01",
        gender: "Male",
        facility: "City Hospital",
        status:"Active",
        id:"1",
        speciality: "Cardiology"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        dob: "1985-05-15",
        gender: "Female",
        facility: "Horizon Health Clinic",
        status:"Active",
        id:"2",
        speciality: "Pediatrics"
    },
    {
        firstName: "Raj",
        lastName: "Patel",
        email: "rajpatel@example.com",
        phone: "456-789-1234",
        dob: "1975-08-22",
        gender: "Male",
        facility: "Downtown Medical Center",
        status:"Active",
        id:"3",
        speciality: "Orthopedics"
    },
    {
        firstName: "Emily",
        lastName: "Johnson",
        email: "emilyjohnson@example.com",
        phone: "321-654-9870",
        dob: "1990-02-10",
        gender: "Female",
        facility: "Westside Hospital",
        status:"Active",
        id:"4",
        speciality: "Neurology"
    },
    {
        firstName: "Ali",
        lastName: "Khan",
        email: "alikhan@example.com",
        phone: "555-123-4567",
        dob: "1982-11-30",
        gender: "Male",
        facility: "Central Health Center",
        status:"Active",
        id:"5",
        speciality: "Dermatology"
    },
    {
        firstName: "Sophia",
        lastName: "Williams",
        email: "sophiawilliams@example.com",
        phone: "444-987-6543",
        dob: "1993-07-18",
        gender: "Female",
        facility: "Northview Clinic",
        status:"Active",
        id:"6",
        speciality: "Gynecology"
    },
    {
        firstName: "Liam",
        lastName: "Brown",
        email: "liambrown@example.com",
        phone: "333-678-9123",
        dob: "1988-09-25",
        gender: "Male",
        facility: "Eastside Hospital",
        status:"Active",
        id:"7",
        speciality: "General Medicine"
    },
    {
        firstName: "Olivia",
        lastName: "Davis",
        email: "oliviadavis@example.com",
        phone: "222-789-4561",
        dob: "1995-03-08",
        gender: "Female",
        facility: "South Coast Medical",
        status:"Active",
        id:"8",
        speciality: "Psychiatry"
    }
];
export const availablityList=[
 {}
]

console.log(doctors);

  
  
  
  export const blockList=[
    {label:"A",value:"A"},
    {label:"B",value:"B"},
    {label:"C",value:"C"},
    {label:"D",value:"D"},
  ]
  export const floorList=[
    {label:"Floor-1",value:"Floor-1"},
    {label:"Floor-2",value:"Floor-2"},
    {label:"Floor-3",value:"Floor-3"},
    {label:"Floor-4",value:"Floor-4"},
  ]