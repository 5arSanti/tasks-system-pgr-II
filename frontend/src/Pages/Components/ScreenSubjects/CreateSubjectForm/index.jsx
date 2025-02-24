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

const CreateSubjectForm = () => {
    const { fetchData, setLoading } = React.useContext(AppContext);

    const [values, setValues] = React.useState({
        nombre: null,
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

        await handlePostData(event, values, "/subjects", getToken());

        setLoading(false);

        reloadLocation();
    }

    return (
        <WrapperContainer2 flexDirection="column" padding={0} height="auto">
            <form onSubmit={handelSumit} style={{ width: "100%" }}>
                <WrapperContainer2 flexDirection="column" padding={0}>
                    <SubTitle>Crear asignatura</SubTitle>

                    <InputCard
                        id={"subject-name"}
                        label={"Titulo de la asignatura"}
                        placeholder="Titulo de la asignatura"
                        required={true}
                        icon={<MdOutlineTitle />}
                        onChange={(event) => handleInputChange("nombre", event, setValues)}
                        defaultValue={values.nombre}
                    />
                
                    <ButtonCard
                        title="Crear nueva asignatura"
                        type="submit"
                    >
                        Crear asignatura
                    </ButtonCard>
                </WrapperContainer2>
            </form>
        </WrapperContainer2>
    );
}

export { CreateSubjectForm };