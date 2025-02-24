import React from "react";
import { AppContext } from "../../../Context";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { SubTitle } from "../../Components/SubTitle";
import { WrapperContainer2 } from "../../Components/WrapperContainers";

import "./styles.css"
import { SpanCard, TextCard } from "../../Components/TextComponents";
import { formatNumbers } from "../../../utils/Format/formatNumbers";

const Home = () => {
    const { user } = React.useContext(AppContext)

    return (
        <AuthWrapper>
            <WrapperContainer2 flexDirection="column" height="auto">
                <SubTitle>Bienvenido al sistema de gestion de tareas</SubTitle>

                <WrapperContainer2 flexDirection="column" gap={10}>
                    <TextCard>Usted ha iniciado sesion como</TextCard>
                    <TextCard><SpanCard fontSize={20}>{user.nombre} {user.apellido}</SpanCard></TextCard>

                    <TextCard>Con el siguiente rol</TextCard>
                    <TextCard><SpanCard fontSize={20}>{user.rol}</SpanCard></TextCard>
                </WrapperContainer2>


                <TextCard className="bold">Datos personales:</TextCard>
                <TextCard>Cedula de Ciudadania: <SpanCard>{formatNumbers(parseInt(user.id))}</SpanCard></TextCard>
                <TextCard>Correo: <SpanCard>{user.correo}</SpanCard></TextCard>

            </WrapperContainer2>
        </AuthWrapper>
    );
}

export { Home };