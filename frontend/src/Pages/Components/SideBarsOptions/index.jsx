import { IsAdminWrapper } from "../AuthWrapper/IsAdminWrapper";
import { LogInfoCard } from "../LogInfoCard"
import { SubTitle } from "../SubTitle";
import { WrapperContainer2 } from "../WrapperContainers"

import { FaUsers } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const SidebarsOptions = () => {
    return (
        <WrapperContainer2 flexDirection="column" padding={0}>
            <WrapperContainer2 padding={10} justifyContent="center" alignItems="center">
                <SubTitle fontSize={16} textAlign="center">Menu de opciones</SubTitle>
            </WrapperContainer2>

            <WrapperContainer2 flexDirection="column" padding={0} gap={0}>
                <IsAdminWrapper>
                    <LogInfoCard
                        icon={<FaUsers />}
                        title={"Usuarios"}
                        text={"Gestion de usuarios"}
                    />

                    <LogInfoCard
                        icon={<FaTasks />}
                        title={"Tareas"}
                        text={"Gestion de tareas"}
                    />

                    <LogInfoCard
                        icon={<FaBookOpen />}
                        title={"Asignaturas"}
                        text={"Gestion de asignaturas"}
                    />
                </IsAdminWrapper>
            </WrapperContainer2>
        </WrapperContainer2>
    )
}

export { SidebarsOptions };