import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import authContext from "../../../store/auth-context";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import classes from "./styles/Signup.module.css";

interface SignupRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignupResponseBody {
    message: string;
    token: string;
    userData: string;
}

const Signup: React.FC = () => {
    const history = useHistory();
    const { sendRequest } = useHttp();
    const { login } = useContext(authContext);

    const emailHook = useInput((value) => value.includes("@"));
    const passwordHook = useInput((value) => value.length >= 8);
    const confirmPasswordHook = useInput((value) => value.length >= 8);

    const isFormValid =
        emailHook.isValid &&
        passwordHook.isValid &&
        confirmPasswordHook.isValid;

    const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();

        const requestBody: SignupRequestBody = {
            email: emailHook.value,
            password: passwordHook.value,
            confirmPassword: confirmPasswordHook.value,
        };

        const data = (await sendRequest(
            "/auth/signup",
            "PUT",
            requestBody
        )) as SignupResponseBody;

        if (!data || !data.token || !data.userData) return;

        login(data.token, data.userData);

        history.push("/auth/discount-choice");
    };

    return (
        <div className={classes.signup}>
            <form onSubmit={submitHandler}>
                <Input
                    name="email"
                    type="email"
                    hook={emailHook}
                    placeholder="Adres e-mail"
                />
                <Input
                    name="password"
                    type="password"
                    hook={passwordHook}
                    placeholder="Hasło (co najmniej 8 znaków)"
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    hook={confirmPasswordHook}
                    placeholder="Potwierdzenie hasła (co najmniej 8 znaków)"
                />
                <Button type="submit" disabled={!isFormValid}>
                    Zarejestruj się
                </Button>
            </form>
            <p>
                Masz juz konto?{" "}
                <Link className={classes.bottomLink} to="/auth/signin">
                    Zaloguj się
                </Link>
            </p>
        </div>
    );
};

export default Signup;
