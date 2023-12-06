import {Outlet} from "react-router-dom";

const Auth = () => {
    return (
        <div className={"flex items-center justify-center w-full h-full bg-gradient-to-br from-[#AFC2D5] to-[#B48B7D]"}>
            <Outlet/>
        </div>
    );
};

export default Auth;