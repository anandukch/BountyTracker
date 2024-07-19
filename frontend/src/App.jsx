import SideBar from "./layouts/SideBar";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const App = () => {
    const router = createBrowserRouter([
       {
          path: "/user",
          element: <SideBar />,
        //   children: [
        //      { index: true, element: <EmployeeList /> },
        //      { path: "create", element: <CreateEmployee /> },
        //      { path: "edit/:id", element: <EditEmployee /> },
        //      { path: "details/:id", element: <EmployeeDetailsPage /> },
        //   ],
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
 