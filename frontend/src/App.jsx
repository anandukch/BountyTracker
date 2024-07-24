import HomeLayout from "./layouts/HomeLayout";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/Login";
import RegisterEmployee from "./pages/RegisterEmployee/RegisterEmployee";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/TaskLists/taskList.jsx";
import TaskDetail from "./pages/Task Detail/taskDetail";
import EmployeeTierList from "./pages/EmployeeTierList/employeeTierList";
// import ReviewPage from "./pages/ReviewPage/ReviewPage.jsx";
import "./App.scss";
import TaskList from "./pages/TaskList/tastList.jsx";
import RequestList from "./pages/RequestList/requestList.jsx";
import EmployeeProfile from "./pages/EmployeeProfile/employeeProfile.jsx";
import ReviewPage from "./pages/ReviewPage/ReviewPage.jsx";


const App = () => {
	// const { data, isSuccess } = useGetProfileQuery();

	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		const { data: employeeData } = data;
	// 		console.log(employeeData);
	// 		dispatch(addLoggedState(employeeData));
	// 	}
	// }, [data, dispatch, isSuccess]);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Hero />,
			children: [
				{
					index: true,
					loader: () => redirect("login"),
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/register",
					element: <RegisterEmployee />,
				},
			],
		},

		// {
		// 	path: "/tasks",
		// 	element: <HomeLayout />,
		// 	children: [
		// 		{ index: true, element: <EmployeeDashboard /> },
		// 		{ path: ":taskId", element: <TaskDetail /> },
		// 	],
		// },

		// {
		// 	path: "/employees",
		// 	element: <HomeLayout />,
		// 	children: [
		// 		{ index: true, element: <EmployeeTierList /> },

		// 		// { path: "taskList", element: <TaskList /> },
		// 		// { path: "employeeList", element: <EmployeeTierList /> },
		// 		{ path: "taskDetails", element: <TaskDetail /> },
		// 		{ path: "profile", element: <EmployeeProfile /> },
		// 	],
		// },
		{
			path: "/tasks",
			element: <HomeLayout />,
			children: [
				{ index: true, element: <TaskList /> },
				{ path: ":taskId/review", element: <ReviewPage /> },
				{ path: ":taskId", element: <TaskDetail /> },
				{ path: "create", element: <CreateTask /> },
			],
		},
		{
			path: "/myTasks",
			element: <HomeLayout />,
			children: [
				{ index: true, element: <MyTask /> },
				// { path: ":taskId", element: <TaskDetail /> },
				{ path: "create", element: <CreateTask /> },
			],
		},
		{
			path: "/requests",
			element: <HomeLayout />,
			children: [{ index: true, element: <RequestList /> }],
		},
		// { path: "tasklist/", element: <HomeLayout />, children: [{ index: true, element: <TaskList /> }] },
		{ path: "bar/", element: <HomeLayout />, children: [{ index: true, element: <Progressbar /> }] },
	]);

	return (
		<main className="App">
			<RouterProvider router={router} />
		</main>
	);
};
export default App;
