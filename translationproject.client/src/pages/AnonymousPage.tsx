import TranslationPage from "./TranslationPage";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AnonymousPage = () => {
    return (
        <div
            className={"w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#AFC2D5] to-[#B48B7D]"}>
            <div className={"w-fit"}>
                <Link to={"/auth"}><ArrowBackIcon className={"text-black"}/></Link>
                <TranslationPage/>
            </div>
        </div>
    );
};

export default AnonymousPage;