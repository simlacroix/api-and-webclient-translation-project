import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Auth from "./components/Auth";
import RegisterPage from "./pages/RegisterPage";
import DashboardPrivateRoutes from "./components/DashboardPrivateRoutes";
import AnonymousPage from "./pages/AnonymousPage";

function App() {
    return (
        <Router>
            <div className={"h-screen w-screen"}>
                <Routes>
                    <Route path={"/"} element={<Navigate replace to={"/dashboard"}/>}/>
                    <Route path={"/auth"} element={<Auth/>}>
                        <Route index element={<LoginPage/>}/>
                        <Route path={"register"} element={<RegisterPage/>}/>
                    </Route>
                    <Route path={"/dashboard/*"} element={<DashboardPrivateRoutes/>}/>
                    <Route path={"/anonymous"} element={<AnonymousPage/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Routes>

            </div>
        </Router>
    )
}

export default App;