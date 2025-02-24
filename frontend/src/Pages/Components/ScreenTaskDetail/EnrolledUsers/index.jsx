import React from "react";
import { AppContext } from "../../../../Context";
import { UserCard } from "../../ScreenUsers/UserCard";
import { SubTitle } from "../../SubTitle";
import { WrapperContainer2 } from "../../WrapperContainers";

const EnrolledUsers = ({ task_id }) => {
    const { responseData, fetchData } = React.useContext(AppContext);
    const { enrolled_users } = responseData;

    React.useEffect(() => {
        const endpoints = [
            `enroll/users/${task_id}`,
        ]

        fetchData(endpoints)
    }, []);

    return (
        <WrapperContainer2 flexDirection="column" padding={0}>
            <SubTitle>Asuarios asignados a esta tarea</SubTitle>

            {enrolled_users && enrolled_users.map((user, index) => (
                <UserCard key={index} item={user} />
            ))}
        </WrapperContainer2>

    );
}

export { EnrolledUsers }