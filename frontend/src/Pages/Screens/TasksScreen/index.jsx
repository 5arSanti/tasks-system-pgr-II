import React from "react";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { SubTitle } from "../../Components/SubTitle";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { TaskCard } from "../../Components/ScreenTasks/TaskCard";
import { AppContext } from "../../../Context";
import { ButtonCard } from "../../Components/ButtonCard";
import { IsAdminWrapper } from "../../Components/AuthWrapper/IsAdminWrapper";
import { CreateTaskForm } from "../../Components/ScreenTasks/CreateTaskForm";

const TasksScreen = () => {
    const { fetchData, responseData, user } = React.useContext(AppContext);
    const { tasks } = responseData;

    const [createTaskModal, setCreateTaskModal] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            const endpoints = [
                (user.rol_id === 1) ? "tasks" : `enroll/users/${user.id}`
            ]

            fetchData(endpoints)
        }
    }, [user]);

    return (
        <AuthWrapper>
            <WrapperContainer2 flexDirection="column" gap={50}>
                <WrapperContainer2 flexDirection="space-between" height="auto" padding={0}>
                    <SubTitle>Gestion de Tareas</SubTitle>

                    <IsAdminWrapper>
                        <ButtonCard title="Crear nueva tarea" onClick={() => { setCreateTaskModal(!createTaskModal) }}>
                            {createTaskModal ? "Cerrar" : "Crear tarea"}
                        </ButtonCard>
                    </IsAdminWrapper>
                </WrapperContainer2>

                {createTaskModal && <CreateTaskForm />}

                <WrapperContainer2 flexDirection="column" gap={20} padding={0}>
                    <SubTitle>Listado de tareas creadas</SubTitle>
                    {tasks && tasks?.map((task, index) => (
                        <TaskCard key={index} item={task} />
                    ))}
                </WrapperContainer2>
            </WrapperContainer2>
        </AuthWrapper>
    );
}

export { TasksScreen };