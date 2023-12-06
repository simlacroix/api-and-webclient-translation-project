import {Alert, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAppDispatch} from "../app/Hooks";
import {loginUser} from "../app/slices/AuthSlice";

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(false);

        try {
            await axios.post('https://localhost:5173/login?useCookies=true&useSessionCookies=true', {
                email: email,
                password: password
            })
            dispatch(loginUser())
            navigate("/dashboard")
        } catch (e: any) {
            setError(true)
        }
    }

    return (
        <Card className={"h-fit flex flex-col w-[28rem]"}>
            <CardHeader title={"Login"} className={"text-center"}/>
            <CardContent className={"flex flex-col gap-y-2"}>
                {error && (
                    <Alert severity={"error"}>
                        <p>Combinaison d'email et de mot de passe invalid</p>
                    </Alert>
                )}
                <TextField label={"Email"} type={"text"}
                           onChange={event => setEmail(event.target.value)}
                           value={email}/>
                <TextField label={"Mot de passe"} type={"password"}
                           onChange={event => setPassword(event.target.value)} value={password}/>
            </CardContent>
            <CardActions className={"flex justify-between"}>
                <div className={"flex flex-col"}>
                    <Typography>
                        Pas encore de compte? <Link to={"/auth/register"}>S'enregistrer</Link>
                    </Typography>
                    <Typography>
                        ou essayer <Link to={"/anonymous"}>anonymement</Link>
                    </Typography>
                </div>

                <Button color={"success"} variant={"contained"} onClick={handleLogin}>Login</Button>
            </CardActions>
        </Card>
    );
};

export default LoginPage;