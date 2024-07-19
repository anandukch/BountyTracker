export const employeeList = [
    {
        name: "Arun",
        id: "1",
        joiningDate: "2024-07-09",
        role: "Full Stack",
        status: "Probation",
        experience: 5,
        address: "Chennai",
        department:"HR"
    },
    {
        name: "Arjun",
        id: "2",
        joiningDate: "2024-07-09",
        role: "Full Stack",
        status: "Probation",
        experience: 3,
        address: "Chennai",
        department:"HR"

    },
    {
        name: "Ben",
        id: "3",
        joiningDate: "2024-07-09",
        role: "Full Stack",
        status: "Active",
        experience: 5,
        address: "Chennai",
        department:"Developement"

    },
    {
        name: "Anandu",
        id: "4",
        joiningDate: "2024-07-09",
        role: "Full Stack",
        status: "Probation",
        experience: 2,
        address: "Chennai",
        department:"Developement"

    },
    {
        name: "Amal",
        id: "5",
        joiningDate: "2024-07-09",
        role: "Full Stack",
        status: "InActive",
        experience: 1,
        address: "Chennai",
        department:"Testing"

    },
];

export const formFields = [
    {
        label: "Employee Name",
        type: "text",
        name: "name",
    },
    {
        label: "Department",
        options: ["Software", "Testing", "HR"],
        name: "department",
    },
    {
        label: "Joining Date",
        type: "date",
        name: "joiningDate",
    },
    {
        label: "Employee ID",
        type: "text",
        name: "id",
    },
    {
        label: "Role",
        options: ["HR", "UI", "Full Stack", "Backend"],
        name: "role",
    },
    {
        label: "Status",
        options: ["Active", "InActive", "Probation"],
        name: "status",
    },
    {
        label: "Experience",
        type: "number",
        name: "experience",
    },
    {
        label: "Address",
        type: "text",
        name: "address",
    },
];