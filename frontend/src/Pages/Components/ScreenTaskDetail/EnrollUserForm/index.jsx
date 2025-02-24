import React from "react";
import { getToken } from "../../../../utils/getToken";
import { handlePostData } from "../../../../utils/handleData/handlePostData";
import { WrapperContainer2 } from "../../WrapperContainers";
import { AppContext } from "../../../../Context";
import { SubTitle } from "../../SubTitle";
import { handleInputChange } from "../../../../utils/handleInputChange";
import { ButtonCard } from "../../ButtonCard";
import { reloadLocation } from "../../../../utils/realoadLocation";
import { DropCard } from "../../DropCard";

const EnrollUserForm = ({ task_id }) => {
    const { fetchData, responseData, setLoading } = React.useContext(AppContext);
    const { users } = responseData;

    const [values, setValues] = React.useState({
        tarea_id: task_id,
        usuario_id: null
    })

    React.useEffect(() => {
        const endpoints = [
            "users?no_details=true",
        ]

        fetchData(endpoints)
    }, []);

    const handelSumit = async (event) => {
        event.preventDefault();

        setLoading(true);

        await handlePostData(event, values, "/enroll", getToken());

        setLoading(false);

        reloadLocation();
    }

    return (
        <WrapperContainer2 flexDirection="column" padding={0} height="auto">
            <form onSubmit={handelSumit} style={{ width: "100%" }}>
                <WrapperContainer2 flexDirection="column" padding={0}>
                    <SubTitle>Asignar usuarios</SubTitle>

                    <DropCard
                        title="Usuarios"
                        array={users}
                        value={values.usuario_id}
                        onClick={(item) => handleInputChange("usuario_id", item, setValues)}
                        searchBox={true}
                        seeAllOption={true}
                    />

                    <ButtonCard
                        title="Asignar tarea"
                        type="submit"
                    >
                        Asignar usuario
                    </ButtonCard>
                </WrapperContainer2>
            </form>
        </WrapperContainer2>
    );
}

export { EnrollUserForm }