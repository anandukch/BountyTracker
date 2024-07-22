import SideBar from "./layouts/SideBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/login";
import CreateUser from "./pages/CreateUser/createUser";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/Dashboard/employeeDashboard";
import TaskDetail from "./pages/Task Detail/taskDetail";
import EmployeeTierList from "./pages/EmployeeTierList/employeeTierList";
import { Provider } from "react-redux";
import store from "./store/store";

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
				{ path: "create", element: <CreateTask /> },
				{ path: "taskDetail", element: <TaskDetail /> },
				{
					path: "employeeList",
					element: <EmployeeTierList />,
				},
				//  { path: "details/:id", element: <EmployeeDetailsPage /> },
			],
		},
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
