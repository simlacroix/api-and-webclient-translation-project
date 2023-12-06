import {Alert, Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios, {AxiosError} from "axios";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setErrors([])
        try {
            await axios.post('https://localhost:5173/register', {
                email: email,
                password: password
            })

            navigate("/auth")
        } catch (e: any) {
            const axiosError = e as AxiosError<any>

            if (axiosError.response && axiosError.response.data.errors) {
                setErrors(Object.values(axiosError.response.data.errors))
            }
        }

    }

    return (
        <Card className={"h-fit flex flex-col w-[28rem]"}>
            <CardHeader title={"S'enregistrer"} className={"text-center"}/>
            <CardContent className={"flex flex-col gap-y-2"}>
                {errors.length > 0 && (
                    <Alert severity={"error"}>
                        {errors.map(value => (
                            <p>{value}</p>
                        ))}
                    </Alert>
                )}
                <TextField label={"Email"} type={"text"}
                           onChange={event => setEmail(event.target.value)} value={email}/>
                <TextField label={"Mot de passe"} type={"password"}
                           onChange={event => setPassword(event.target.value)} value={password}/>
            </CardContent>
            <CardActions className={"flex justify-between"}>
                <p>Vous avez déjà un compte? <Link to={"/auth"}>Se&nbsp;connecter</Link></p>
                <Button color={"success"} variant={"contained"} onClick={handleRegister}>S'enregistrer</Button>
            </CardActions>
        </Card>
    );
};

export default RegisterPage;