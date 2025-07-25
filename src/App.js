import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { About } from "./components/About";
import { Contact } from "./components/Contact.js";
import { Error } from "./components/Error";
import RestaurantMenu from "./components/restaurantMenu";
import UserContext from "./utils/userContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import { Cart } from "./components/Cart.js";
import { Nav } from "./components/nav";

const Grocery = lazy(()=> import("./components/Grocery"))


const AppLayout = () => {

    const [userName, setUserName] = useState();

    useEffect(() => {
        const data = {
            name: "Akshay"
        }
        setUserName(data.name)
    }, []);



    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser : userName, setUserName}}>
                <div className="app overflow-hidden">
                    <Header />
                    <Nav />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path:"/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            }
            ,{
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading....</h1>}> 
                    <Grocery />
                </Suspense>
            },{
                path:"/restaurants/:resId",
                element: <RestaurantMenu />
            },{
                path: "/cart",
                element: <Cart />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);