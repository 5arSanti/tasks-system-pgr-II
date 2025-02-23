import React from "react";

import { AppContext } from "../../../Context";

import { handleInputChange } from "../../../utils/handleInputChange";
import { InputCard } from "../../components/InputsCards";
import { handlePostData } from "../../../utils/handleData/handlePostData";
import { WrapperContainer2 } from "../../components/WrapperContainers";
import { FadeWrapper } from "../../components/FadeWrapper";
import { SectionTitle } from "../../components/SectionWrapper/SectionTitle";
import { TextCard } from "../../components/TextComponents";
import { GridContainer } from "../../components/GridContainer";
import { useNavigate } from "react-router-dom";
import { AuthWrapper } from "../../components/AuthWrapper";

const RegisterScreen = () => {
    const { setLoading } = React.useContext(AppContext);

    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        id: null,
        nombre: null,
        apellido: null,
        correo: null,
        contrasena: null,
        confirmar_contraseña: null,
    })

    const handleRegister = async (event) => {
        event.preventDefault();

        setLoading(true);

        await handlePostData(event, values, "/users");

        setLoading(false);

        navigate("/login")
    }

    return (

        <AuthWrapper>
        {/* <StyledSection height="auto"> */}
                <FadeWrapper>
                    <WrapperContainer2 padding={30} flexDirection="column" justifyContent="center" alignItems="center">
                        <SectionTitle title="Cree su cuenta" subTitle="Bienvenido" />

                        <WrapperContainer2
                            className="login-container"
                            flexDirection="column"
                            padding={"50px 75px"} gap={30}
                            height="auto"
                        >
                            <TextCard textAlign="center" fontSize={18}>
                                Registrese en el sistema
                            </TextCard>

                            <form className="login-form-container" onSubmit={handleRegister}>
                                <InputCard
                                    id={"user-id"}
                                    label={"Cedula:"}
                                    placeholder="Ingrese su numero de cédula"
                                    onChange={(event) => handleInputChange("id", event, setValues)}
                                    defaultValue={values?.id}
                                />

                                <GridContainer>
                                    <InputCard
                                        id={"name"}
                                        label={"Nombre:"}
                                        placeholder="Ingrese su nombre"
                                        onChange={(event) => handleInputChange("nombre", event, setValues)}
                                        defaultValue={values?.nombre}
                                    />
                                    <InputCard
                                        id={"surnames"}
                                        label={"Apellidos:"}
                                        placeholder="Ingrese los apellidos"
                                        onChange={(event) => handleInputChange("apellido", event, setValues)}
                                        defaultValue={values?.apellido}
                                    />
                                </GridContainer>
                                <InputCard
                                    type="email"
                                    id={"email"}
                                    label={"Correo:"}
                                    placeholder="Ingrese su correo"
                                    onChange={(event) => handleInputChange("correo", event, setValues)}
                                    defaultValue={values?.correo}
                                />
                                <GridContainer padding={0}>
                                    <InputCard
                                        type="password"
                                        id={"password"}
                                        label={"Contraseña:"}
                                        placeholder="Ingrese su contraseña"
                                        onChange={(event) => handleInputChange("contrasena", event, setValues)}
                                        defaultValue={values?.contrasena}
                                    />
                                    <InputCard
                                        type="password"
                                        id={"confirm-password"}
                                        label={"Confirmar Contraseña:"}
                                        placeholder="Ingrese su contraseña"
                                        onChange={(event) => handleInputChange("confirmar_contraseña", event, setValues)}
                                        defaultValue={values?.confirmar_contraseña}
                                    />
                                </GridContainer>

                                <button type="submit">Crear cuenta</button>
                            </form>

                        </WrapperContainer2>
                    </WrapperContainer2>
                </FadeWrapper>
        {/* </StyledSection> */}
        </AuthWrapper>
    );
}

export { RegisterScreen }