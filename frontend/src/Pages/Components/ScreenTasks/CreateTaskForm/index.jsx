import React from "react";
import { GridContainer } from "../../GridContainer";
import { DateInputCard, InputCard, OptionInputCard, TextAreaCard } from "../../InputsCards";
import { SubTitle } from "../../SubTitle";
import { WrapperContainer2 } from "../../WrapperContainers";

import { MdOutlineTitle } from "react-icons/md";
import { AppContext } from "../../../../Context";
import { handleInputChange } from "../../../../utils/handleInputChange";
import { ButtonCard } from "../../ButtonCard";
import { handlePostData } from "../../../../utils/handleData/handlePostData";
import { getToken } from "../../../../utils/getToken";
import { reloadLocation } from "../../../../utils/realoadLocation";

const CreateTaskForm = () => {
    const { responseData, fetchData, user, setLoading } = React.useContext(AppContext);

    const [values, setValues] = React.useState({
        titulo: null,
        descripcion: null,
        fecha_entrega: null,
        asignatura_id: null,
        usuario_id: parseInt(user?.id),
    })

    console.log(values)

    React.useEffect(() => {
        const endpoints = [
            "subjects"
        ]

        fetchData(endpoints)
    }, []);

    const handelSumit = async (event) => {
        event.preventDefault();

        setLoading(true);

        await handlePostData(event, values, "/tasks", getToken());
        
        setLoading(false);

        reloadLocation();
    }

    return (
        <WrapperContainer2 flexDirection="column" padding={0} height="auto">
            <form onSubmit={handelSumit} style={{ width: "100%" }}>
                <WrapperContainer2 flexDirection="column" padding={0}>
                    <SubTitle>Crear Tarea</SubTitle>

                    <GridContainer className="grid-1-1">
                        <InputCard
                            id={"task-title"}
                            label={"Titulo de la tarea"}
                            placeholder="Titulo de la tarea"
                            required={true}
                            icon={<MdOutlineTitle />}
                            onChange={(event) => handleInputChange("titulo", event, setValues)}
                            defaultValue={values.titulo}
                        />

                        <DateInputCard
                            id={"task-date"}
                            label={"Fecha de entrega"}
                            required={true}
                            onChange={(event) => handleInputChange("fecha_entrega", event, setValues)}
                            defaultValue={values.fecha_entrega}
                        />
                    </GridContainer>

                    <GridContainer className="grid-15-05">
                        <TextAreaCard
                            id={"task-description"}
                            label={"Descripcion de la tarea"}
                            placeholder="Descripcion de la tarea"
                            required={true}
                            onChange={(event) => handleInputChange("descripcion", event, setValues)}
                            defaultValue={values.descripcion}
                        />
                        <OptionInputCard
                            id={"task-subject"}
                            label={"Asignatura"}
                            placeholder="Selecciona una asignatura"
                            array={responseData?.subjects}
                            onChange={(item) => handleInputChange("asignatura_id", item, setValues)}
                            defaultValue={values.asignatura_id}
                            none={true}
                        />
                    </GridContainer>

                    <ButtonCard
                        title="Crear nueva tarea"
                        type="submit"
                    >
                        Crear tarea
                    </ButtonCard>
                </WrapperContainer2>
            </form>
        </WrapperContainer2>
    );
}

export { CreateTaskForm };