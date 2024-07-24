import HomeLayout from "./layouts/HomeLayout";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/Login";
import RegisterEmployee from "./pages/RegisterEmployee/RegisterEmployee";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/TaskLists/taskList.jsx";
import TaskDetail from "./pages/Task Detail/taskDetail";
import EmployeeTierList from "./pages/EmployeeTierList/employeeTierList";
import { Provider } from "react-redux";
import store from "./store/store";
import ReviewPage from "./pages/ReviewPage/ReviewPage.jsx";
import "./App.scss";
import TaskList from "./pages/TaskList/tastList.jsx";
import Progressbar from "./components/ProgressBar/ProgressBar.jsx";
import MyTask from "./pages/myTask/myTask.jsx";
import RequestList from "./pages/RequestList/requestList.jsx";
import EmployeeProfile from "./pages/EmployeeProfile/employeeProfile.jsx";


const App = () => {
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

		{
			path: "/tasks",
			element: <HomeLayout />,
			children: [{ index: true, element: <EmployeeDashboard /> }],
		},

		{
			path: "/employees",
			element: <HomeLayout />,
			children: [
				{ index: true, element: <EmployeeTierList /> },

				// { path: "taskList", element: <TaskList /> },
				// { path: "employeeList", element: <EmployeeTierList /> },
				{ path: "taskDetails", element: <TaskDetail /> },
				{ path: "profile", element: <EmployeeProfile /> },
			],
		},
		// {
		// 	path: "/tasks",
		// 	element: <HomeLayout />,
		// 	children: [
		// 		{ index: true, element: <TaskList /> },
		// 		{ path: ":taskId/review", element: <ReviewPage /> },
		// 		{ path: ":taskId", element: <TaskDetail /> },
		// 		{ path: "create", element: <CreateTask /> },
		// 	],
		// },
		// {
		// 	path: "/myTasks",
		// 	element: <HomeLayout />,
		// 	children: [
		// 		{ index: true, element: <MyTask /> },
		// 		// { path: ":taskId", element: <TaskDetail /> },
		// 		{ path: "create", element: <CreateTask /> },
		// 	],
		// },
		{
			path: "/requests",
			element: <HomeLayout />,
			children: [{ index: true, element: <RequestList /> }],
		},
		{ path: "tasklist/", element: <HomeLayout />, children: [{ index: true, element: <TaskList /> }] },
		{ path: "bar/", element: <HomeLayout />, children: [{ index: true, element: <Progressbar /> }] },
	]);

	return (
		<Provider store={store}>
			<main className="App">
				<RouterProvider router={router} />
			</main>
		</Provider>
	);
};
export default App;
