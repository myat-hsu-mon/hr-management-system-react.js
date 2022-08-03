export const departments = [
  { id: 3, name: "HR" },
  { id: 1, name: "Accountant" },
  { id: 2, name: "IT Depts" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "Customer Service" },
  { id: 6, name: "Sales Dept" },
];

export const designations = [
  { id: 0, name: "All" },
  { id: 1, name: "Web Developer" },
  { id: 2, name: "Senior Web Developer" },
  { id: 3, name: "HR Manager" },
  { id: 4, name: "UI/UX Developer" },
  { id: 5, name: "IT Assistant" },
  { id: 6, name: "CEO" },
];

export const employmentTypes = [
  { id: 0, name: "Full Time" },
  { id: 1, name: "Part Time" },
  { id: 2, name: "Remote" },
  { id: 3, name: "Project Based" },
  { id: 4, name: "Contract Based" },
];

export const paymentTypes = [
  { id: 0, name: "UAB" },
  { id: 1, name: "KBZ" },
  { id: 2, name: "Cash" },
  { id: 3, name: "Paypal" },
];

export const leaveTypes = [
  {
    id: 0,
    name: "Annual Leave",
  },
  {
    id: 1,
    name: "Sick Leave",
  },
  {
    id: 2,
    name: "Maternity Leave",
  },
  {
    id: 3,
    name: "Paternity Leave",
  },
  {
    id: 4,
    name: "Medical Leave",
  },
  {
    id: 5,
    name: "Unpaid Leave",
  },
];

export const leaveStatus = [
  {
    id: 0,
    name: "Pending",
  },
  {
    id: 1,
    name: "Declined",
  },
  {
    id: 2,
    name: "Approved",
  },
];

export const status = [
  { id: 0, name: "Active" },
  { id: 1, name: "Inactive" },
  { id: 2, name: "Completed" },
];

/***********************DB Designs***************************************** */

// 2) Employees Table
export const employees = [
  {
    name: "Jane Cooper",
    id: "0001",
    designation: "Regional Paradigm Technician",
    email: "jane.cooper@example.com",
    phone: "0912345678",
  },
  {
    name: "Cody Fisher",
    id: "0002",
    designation: "Product Directives Officer",
    email: "cody.fisher@example.com",
    phone: "0988675584",
  },
];

export const employeeDetail = {
  name: "Jane Cooper",
  username: "@Jane",
  department: "IT depts",
  joiningDate: "2/2/2021",
  employmentType: "Full Time",
  salaryAmount: 2000,
  id: "0001",
  designation: "Regional Paradigm Technician",
  email: "jane.cooper@example.com",
  phone: "0912345678",
  company: "Google",
  paymentType: "UAB",
  contactName: "Mr. John",
  contactRelation: "father",
  contactPhone: "+9594325435",
  bankName: "KBZ",
  bankAccountNumber: "453645647",
  institudeName: "Harvard University",
  degree: "Bachelor of Engineering",
  institudeStartingYear: "1/2/2010",
  institudeEndingYear: "10/2/2005",
};

// 2) Projects Table
export const projects = [
  {
    title: "Elevate",
    id: "001",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quos quisquam hic debitis alias aperiam aspernatur culpa, quibusdam eos molestias, assumenda maiores. Ducimus, ad pariatur. Ullam, aliquid quia? Laborum, nisi!",
    deadline: "2/2/2021",
    startDate: "2/4/2019",
    endDate: "4/33/2009",
    client: "Amazon",
    status: "active",
    projectLeader: { name: "Mr Like" },
    projectManager: { name: "Mr Irene" },
    teams: [
      {
        name: "Ms. Jawie Son",
      },
      {
        name: "Mr. Harry",
      },
      {
        name: "Luke Serres",
      },
      {
        name: "Luke",
      },
    ],
  },
  {
    title: "High Ground",
    id: "003",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quos quisquam hic debitis alias aperiam aspernatur culpa, quibusdam eos molestias, assumenda maiores. Ducimus, ad pariatur. Ullam, aliquid quia? Laborum, nisi!",
    deadline: "2/2/2021",
    startDate: "2/4/2019",
    endDate: "4/33/2009",
    client: "Amazon",
    projectLeader: { name: "Mr Like" },
    status: "active",
    projectManager: { name: "Michael Erics" },
    teams: [
      {
        name: "Ms. Jawie Son",
      },
      {
        name: "Mr. Harry JOmes",
      },
      {
        name: "Luke Serres",
      },
      {
        name: "Ms.  Son",
      },
      {
        name: "Mr. Harry",
      },
    ],
  },
];

// 3) Leaves Table

export const leaves = [
  {
    id: 1,
    name: "Marry",
    leaveType: "Sick Leave",
    from: "2/2/2021",
    to: "4/2/2021",
    numberOfDays: 2,
    leaveReason: "I am sick in this morning",
  },
  {
    id: 2,
    name: "Boris",
    leaveType: "Annual Leave",
    from: "2/2/2021",
    to: "4/2/2021",
    numberOfDays: 2,
    leaveReason: "I start annual leave from tomorrow",
  },
];

// 4) Overtimes
export const overtimes = [
  {
    id: 1,
    name: "Boris",
    startDateAndTime: "2/2/2021 9:00am",
    endDateAndTime: "2/2/2021 5:00pm",
    totalHours: "8hr",
    reason: "lorem.....",
  },
  {
    id: 2,
    name: "Maria",
    startDateAndTime: "2/2/2021 12:00am",
    endDateAndTime: "2/2/2021 5:00pm",
    totalHours: "5hr",
    reason: "client urgent needed.....",
  },
];

// 5) Payroll Table
export const payroll = [
  {
    id: 1,
    name: "Myat",
    email: "myat@gmail.com",
    designation: "Web Developer",
    salary: 300,
    month: "February, 2021",
    deductions: 200,
    bonus: 200,
  },
  {
    id: 2,
    name: "Myat",
    email: "myat@gmail.com",
    designation: "Web Developer",
    salary: 400,
    month: "March, 2021",
    deductions: 500,
    bonus: 300,
  },
];

// 6) Promotions Table
export const promotions = [
  {
    id: "0001",
    name: "John Smith",
    department: "It departments",
    promotedFrom: "Web Developer",
    promotedTo: "Senior Web Developer",
    date: "2/2/2021",
  },
  {
    id: "0002",
    name: "Marry Chak",
    department: "It departments",
    promotedFrom: "Web Developer",
    promotedTo: "Senior Web Developer",
    date: "2/2/2021",
  },
];
