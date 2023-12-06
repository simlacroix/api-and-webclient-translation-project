import {useAppDispatch, useAppSelector} from "../app/Hooks";
import {Navigate, Route, Routes} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import {Button} from "@mui/material";
import {logoutUser} from "../app/slices/AuthSlice";
import TranslationPage from "../pages/TranslationPage";
import HistoryPage from "../pages/HistoryPage.tsx";

const DashboardPrivateRoutes = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const useDispatch = useAppDispatch();
    const handleLogout = () => {
        useDispatch(logoutUser())
    }

    if (!isAuthenticated) {
        return <Navigate replace to={'/auth'}/>;
    }

    return (
        <div className={"flex w-full h-full"}>
            <Sidebar/>
            <div className={"flex flex-col flex-grow"}>
                <div className={"h-12 bg-[#333] flex items-center justify-end"}>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div
                    className={"flex items-center justify-center w-full h-full bg-gradient-to-br from-[#AFC2D5] to-[#B48B7D]"}>
                    <Routes>
                        <Route path={''} element={<TranslationPage/>}/>
                        <Route path={"/history"} element={<HistoryPage/>}/>
                    </Routes>
                </div>
            </div>

        </div>
    );
};

export default DashboardPrivateRoutes;