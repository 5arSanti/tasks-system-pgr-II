import React from "react";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { SubTitle } from "../../Components/SubTitle";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { TaskCard } from "../../Components/ScreenTasks/TaskCard";
import { AppContext } from "../../../Context";

const TasksScreen = () => {
    const { fetchData, responseData, user } = React.useContext(AppContext);
    const { tasks } = responseData;

    React.useEffect(() => {
        const endpoints = [
            user && user.rol_id === 1 ? "tasks" : `tasks/${user.id}`
        ]

        fetchData(endpoints)
    }, []);

    return (
        <AuthWrapper>
            <WrapperContainer2 flexDirection="column">
                <SubTitle>Tareas</SubTitle>
                {tasks && tasks?.map((task, index) => (
                    <TaskCard key={index} item={task}/>
                ))}
            </WrapperContainer2>
        </AuthWrapper>
    );
}

export { TasksScreen };