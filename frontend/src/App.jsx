import HomeLayout from "./layouts/HomeLayout";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/login";
import CreateUser from "./pages/CreateUser/createUser";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/Dashboard/employeeDashboard";
import TaskDetail from "./pages/Task Detail/taskDetail";
import EmployeeTierList from "./pages/EmployeeTierList/employeeTierList";

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
					element: <CreateUser />,
				},
			],
		},

		{
			path: "/employee",
			element: <HomeLayout />,
			children: [
				{ index: true, element: <EmployeeDashboard /> },
				{ path: "create", element: <CreateTask /> },
				{ path: "taskDetail", element: <TaskDetail /> },
				{ path: "employeeList", element: <EmployeeTierList /> },
				//  { path: "details/:id", element: <EmployeeDetailsPage /> },
			],
		},
	]);

	return (
		//    <Provider store={store}>
		<main className="App">
			<RouterProvider router={router} />
		</main>
	);
};
export default App;
