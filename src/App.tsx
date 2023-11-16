import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./page/Home";
import Accounts from "./component/Accounts";
import PageNotFound from "./page/404";
import Transfer from "./component/Transfer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: '/accounts',
        element: <Accounts/>,
      },
      {
        path: '/transfer',
        element: <Transfer/>,
      }
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App
