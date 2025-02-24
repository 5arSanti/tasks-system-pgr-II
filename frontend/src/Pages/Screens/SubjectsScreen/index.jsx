import React from "react";
import { AuthWrapper } from "../../Components/AuthWrapper";
import { SubTitle } from "../../Components/SubTitle";
import { WrapperContainer2 } from "../../Components/WrapperContainers";
import { AppContext } from "../../../Context";
import { ButtonCard } from "../../Components/ButtonCard";
import { IsAdminWrapper } from "../../Components/AuthWrapper/IsAdminWrapper";
import { SubjectCard } from "../../Components/ScreenSubjects/SubjectCard";
import { GridContainer } from "../../Components/GridContainer";
import { CreateSubjectForm } from "../../Components/ScreenSubjects/CreateSubjectForm";

const SubjectsScreen = () => {
    const { fetchData, responseData } = React.useContext(AppContext);
    const { subjects } = responseData;

    const [createSubjectModal, setCreateSubjectModal] = React.useState(false);

    React.useEffect(() => {
        if (subjects) { return; }

        const endpoints = [
            "subjects"
        ]

        fetchData(endpoints)
    }, []);

    return (
        <AuthWrapper>
            <IsAdminWrapper>
                <WrapperContainer2 flexDirection="column" gap={50}>
                    <WrapperContainer2 flexDirection="space-between" height="auto" padding={0}>
                        <SubTitle>Gestion de Asignaturas</SubTitle>

                        <IsAdminWrapper>
                            <ButtonCard title="Crear nueva tarea" onClick={() => { setCreateSubjectModal(!createSubjectModal) }}>
                                {createSubjectModal ? "Cerrar" : "Crear asignatura"}
                            </ButtonCard>
                        </IsAdminWrapper>
                    </WrapperContainer2>

                    {createSubjectModal && <CreateSubjectForm />}

                    <WrapperContainer2 flexDirection="column" gap={20} padding={0}>
                        <SubTitle>Listado de asignaturas creadas</SubTitle>
                        <GridContainer className="grid-1-1-1">
                            {subjects && subjects?.map((task, index) => (
                                <SubjectCard key={index} item={task} />
                            ))}
                        </GridContainer>
                    </WrapperContainer2>
                </WrapperContainer2>
            </IsAdminWrapper>
        </AuthWrapper>
    );
}

export { SubjectsScreen };