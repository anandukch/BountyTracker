import HomeLayout from "./layouts/HomeLayout";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask/createTask";
import Login from "./pages/Login/Login";
import RegisterEmployee from "./pages/RegisterEmployee/RegisterEmployee";
import Hero from "./components/Hero/Hero";
import EmployeeDashboard from "./pages/Dashboard/employeeDashboard";
import TaskDetail from "./pages/Task Detail/taskDetail";
import EmployeeTierList from "./pages/EmployeeTierList/employeeTierList";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import ReviewPage from "./pages/ReviewPage/reviewPage";
import "./App.scss";
import TaskList from "./pages/TaskList/tastList.jsx";


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
			path: "/profile",
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
				{ path: "comment/:id", element: <ReviewPage /> },
				{ path: "taskDetails", element: <TaskDetail /> },
				
			],
		},
		{
			path: "tasks/",
			element: <HomeLayout />,
			children: [
				{ index: true, element: <TaskList /> },
				{path: ":taskId", element: <TaskDetail />},
				{ path: "create", element: <CreateTask /> },
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
