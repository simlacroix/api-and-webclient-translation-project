import {Link} from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className={"pt-[45.64px]"}>
                <li><Link className={"p-4"} to={"/dashboard"}>Tradcution</Link></li>
                <li><Link className={"p-4"} to={"/dashboard/history"}>Historique</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;