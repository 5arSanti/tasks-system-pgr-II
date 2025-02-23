import { handleLogout } from "../../../utils/handleData/handleLogout";
import { IsAdminWrapper } from "../AuthWrapper/IsAdminWrapper";
import { IsAuthWrapper } from "../AuthWrapper/IsAuthWrapper";
import { LogInfoCard } from "../LogInfoCard"
import { SubTitle } from "../SubTitle";
import { WrapperContainer2 } from "../WrapperContainers"

import { FaUsers } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const SidebarsOptions = () => {
    
    return (
        <WrapperContainer2 flexDirection="column" padding={0}>
            <WrapperContainer2 padding={10} justifyContent="center" alignItems="center" height="auto">
                <SubTitle fontSize={16} textAlign="center">Menu de opciones</SubTitle>
            </WrapperContainer2>

            <WrapperContainer2 flexDirection="column" padding={0} gap={0}>
                <IsAuthWrapper>
                    <LogInfoCard
                        icon={<FaTasks />}
                        title={"Tareas"}
                        text={"Gestion de tareas"}
                    />
                </IsAuthWrapper>
                
                <IsAdminWrapper>
                    <LogInfoCard
                        icon={<FaUsers />}
                        title={"Usuarios"}
                        text={"Gestion de usuarios"}
                    />

                    <LogInfoCard
                        icon={<FaBookOpen />}
                        title={"Asignaturas"}
                        text={"Gestion de asignaturas"}
                    />
                </IsAdminWrapper>

                <IsAuthWrapper>
                    <LogInfoCard
                        icon={<MdLogout />}
                        title={"Cerrar sesion"}
                        text={"¿Te vas?"}
                        onClick={handleLogout}
                    />
                </IsAuthWrapper>
            </WrapperContainer2>
        </WrapperContainer2>
    )
}

export { SidebarsOptions };