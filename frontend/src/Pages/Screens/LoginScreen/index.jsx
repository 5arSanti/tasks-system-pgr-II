import React from "react";

import { AppContext } from "../../../Context";

import { useNavigate } from "react-router-dom";

import { scrollToValue } from "../../../utils/scrollToValue";
import { InputCard } from "../../Components/InputsCards";
import { handleInputChange } from "../../../utils/handleInputChange";

import "./styles.css";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { SectionTitle } from "../../Components/SectionWrapper/SectionTitle";
import { TextCard } from "../../Components/TextComponents";
import { FadeWrapper } from "../../Components/FadeWrapper";
import { ButtonCard } from "../../Components/ButtonCard";
import { handlePostData } from "../../../utils/handleData/handlePostData";
import { AuthWrapper } from "../../Components/AuthWrapper";

const LoginScreen = () => {
    const { setLoading } = React.useContext(AppContext);

    React.useEffect(() => {
        scrollToValue()
    }, []);

    const [values, setValues] = React.useState({
        correo: null,
        contrasena: null,
    })

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const { access_token } = await handlePostData(event, values, "/auth/login");

        localStorage.setItem("access_token", access_token);

        navigate("/home");

        setLoading(false);
    }

    return (
        // <AuthWrapper>
        <FadeWrapper>
            <WrapperContainer2 padding={50} flexDirection="column" justifyContent="center" alignItems="center">
                <SectionTitle subTitle="Bienvenido a" title="TASKS SYSTEM" />

                <WrapperContainer2
                    className="login-container"
                    flexDirection="column"
                    padding={"50px 100px"} gap={30}
                    height="auto"
                >
                    <TextCard textAlign="center" fontSize={18}>
                        Inicia sesión con tu cuenta
                    </TextCard>

                    <form className="login-form-container" onSubmit={handleSubmit}>
                        <InputCard
                            type="email"
                            id={"email"}
                            label={"Correo:"}
                            placeholder="Ingrese su correo"
                            onChange={(event) => handleInputChange("correo", event, setValues)}
                            defaultValue={values?.correo}
                        />
                        <InputCard
                            type="password"
                            id={"password"}
                            label={"Contraseña:"}
                            placeholder="Ingrese su contraseña"
                            onChange={(event) => handleInputChange("contrasena", event, setValues)}
                            defaultValue={values?.contrasena}
                        />
                        <button type="submit">Iniciar sesion</button>

                    </form>


                    <WrapperContainer2 flexDirection="column" gap={20} padding={"75px 0 0 0"}>
                        <TextCard textAlign="center">¿No tiene cuenta?</TextCard>
                        <ButtonCard onClick={() => navigate("/register")}>Registrate</ButtonCard>
                    </WrapperContainer2>
                </WrapperContainer2>
            </WrapperContainer2>
        </FadeWrapper>
        // </AuthWrapper>
    );
}

export { LoginScreen }