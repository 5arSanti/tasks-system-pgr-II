import { ButtonCard } from "../../ButtonCard";
import { GridContainer } from "../../GridContainer";
import { SubInfoCard } from "../../SubInfoCard";
import { SpanCard, TextCard } from "../../TextComponents";
import { WrapperContainer1, WrapperContainer2 } from "../../WrapperContainers";

import { MdDeleteOutline } from "react-icons/md";

import moment from "moment";

import "./styles.css";
import React from "react";
import { AppContext } from "../../../../Context";
import { handleDeleteData } from "../../../../utils/handleData/handleDeleteData";
import { getToken } from "../../../../utils/getToken";

const TaskCard = ({ item = {} }) => {
    const { setLoading } = React.useContext(AppContext);

    const onDeleteTask = async (event) => {
        setLoading(true);

        await handleDeleteData(event, `/tasks/${item.task_id}`, getToken());

        setLoading(false);
    }

    return (
        <WrapperContainer1 flexDirection="column" padding={30} className="relative">
            <WrapperContainer2 width="50px" height="50px" padding={0} className="delete-button">
                <ButtonCard padding={15} onClick={onDeleteTask}>
                    <MdDeleteOutline />
                </ButtonCard>
            </WrapperContainer2>

            <TextCard className="bold italic" fontSize={20}>{item.task_title}</TextCard>

            <TextCard fontSize={12} className="italic"><SpanCard fontSize={12}>Asignatura:</SpanCard> {item.subject_name}</TextCard>

            <TextCard fontSize={12} className="italic"><SpanCard fontSize={12}>Descipción:</SpanCard></TextCard>
            <TextCard fontSize={18}>{item.task_description}</TextCard>

            <TextCard fontSize={12} className="italic"><SpanCard fontSize={12}>Fecha de entrega:</SpanCard></TextCard>
            <TextCard fontSize={18} className="bold">{moment(item.task_due_date).format("DD/MM/YYYY HH:mm")}</TextCard>

            <GridContainer className="grid-1-1">
                <SubInfoCard
                    textAlign="center"
                    subTitle="Fecha de creación"
                    text={moment(item.task_created_at).format("DD/MM/YYYY HH:mm")}
                />
                <SubInfoCard
                    textAlign="center"
                    subTitle="Fecha de actualización"
                    text={moment(item.task_updated_at).format("DD/MM/YYYY HH:mm")}
                />
            </GridContainer>
        </WrapperContainer1>
    );
}

export { TaskCard };