import SideBar from "./layouts/SideBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/login";
import CreateUser from "./pages/CreateUser/createUser";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/Dashboard/employeeDashboard";
import TaskList from "./pages/TaskList/tastList.jsx";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Hero />,
			children: [
				{
					index: true,
					element: <Login />,
				},
				{
					path: "/register",
					element: <CreateUser />,
				},
			],
		},

		{
			path: "/user",
			element: <SideBar />,
			children: [
				{
					index: true,
					element: <EmployeeDashboard />,
				},
				//  { path: "create", element: <CreateEmployee /> },
				//  { path: "edit/:id", element: <EditEmployee /> },
				//  { path: "details/:id", element: <EmployeeDetailsPage /> },
      
			],
		},
		{ path: "tasklist/", element: <TaskList /> },
	]);

	return (
		//    <Provider store={store}>
		<main className="App">
			<RouterProvider router={router} />
		</main>
	);
};
export default App;
