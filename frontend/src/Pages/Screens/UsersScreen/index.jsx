import React from "react";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { SubTitle } from "../../Components/SubTitle";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { AppContext } from "../../../Context";
import { ButtonCard } from "../../Components/ButtonCard";
import { IsAdminWrapper } from "../../Components/AuthWrapper/IsAdminWrapper";
import { CreateTaskForm } from "../../Components/ScreenTasks/CreateTaskForm";
import { UserCard } from "../../Components/ScreenUsers/UserCard";

const UsersScreen = () => {
    const { fetchData, responseData } = React.useContext(AppContext);
    const { users } = responseData;

    const [createModal, setCreateModal] = React.useState(false);

    React.useEffect(() => {        
        const endpoints = [
            "users"
        ]

        fetchData(endpoints)

    }, []);

    return (
        <AuthWrapper>
            <WrapperContainer2 flexDirection="column" gap={50}>
                <WrapperContainer2 flexDirection="space-between" height="auto" padding={0}>
                    <SubTitle>Gestion de Usuarios</SubTitle>

                    <IsAdminWrapper>
                        <ButtonCard title="Crear nueva tarea" onClick={() => { setCreateModal(!createModal) }}>
                            {createModal ? "Cerrar" : "Crear tarea"}
                        </ButtonCard>
                    </IsAdminWrapper>
                </WrapperContainer2>

                {createModal && <CreateTaskForm />}

                <WrapperContainer2 flexDirection="column" gap={20} padding={0}>
                    <SubTitle>Listado de usarios creadas</SubTitle>
                    {users && users?.map((task, index) => (
                        <UserCard key={index} item={task} />
                    ))}
                </WrapperContainer2>
            </WrapperContainer2>
        </AuthWrapper>
    );
}

export { UsersScreen };