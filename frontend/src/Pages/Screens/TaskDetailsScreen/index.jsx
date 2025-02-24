import React from "react";
import { AppContext } from "../../../Context";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { SubTitle } from "../../Components/SubTitle";
import { TaskCard } from "../../Components/ScreenTasks/TaskCard";
import { useParams } from "react-router-dom";
import { EnrollUserForm } from "../../Components/ScreenTaskDetail/EnrollUserForm";
import { IsAdminWrapper } from "../../Components/AuthWrapper/IsAdminWrapper";

const TaskDetailsScreen = () => {
    const { task_id } = useParams();

    const { fetchData, responseData } = React.useContext(AppContext);
    const { task } = responseData;

    React.useEffect(() => {
        const endpoints = [
            `tasks/${task_id}`
        ]

        fetchData(endpoints)
    }, []);

    return (
        <AuthWrapper>
            <WrapperContainer2 flexDirection="column" gap={50}>
                <SubTitle>Detalles de la tarea</SubTitle>

                <TaskCard item={task} details={false} />

                <IsAdminWrapper>
                    <EnrollUserForm task_id={task_id}/>
                </IsAdminWrapper>
            </WrapperContainer2>
        </AuthWrapper>
    );
}

export { TaskDetailsScreen }