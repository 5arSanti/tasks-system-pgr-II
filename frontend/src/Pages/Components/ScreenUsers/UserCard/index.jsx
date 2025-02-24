import React from "react";
import { AppContext } from "../../../../Context";
import { handleDeleteData } from "../../../../utils/handleData/handleDeleteData";
import { getToken } from "../../../../utils/getToken";
import { WrapperContainer1, WrapperContainer2 } from "../../WrapperContainers";
import { ButtonCard } from "../../ButtonCard";
import { MdDeleteOutline } from "react-icons/md";
import { SpanCard, TextCard } from "../../TextComponents";

const UserCard = ({ item = {} }) => {
    const { setLoading } = React.useContext(AppContext);

    const onDeleteTask = async (event) => {
        setLoading(true);

        await handleDeleteData(event, `/users?id=${item.id}`, getToken());

        setLoading(false);
    }

    return (
        <WrapperContainer1 flexDirection="column" padding={30} className="relative" height="auto">
            <WrapperContainer2 width="auto" height="50px" padding={0} className="delete-button">
                <ButtonCard padding={15} onClick={onDeleteTask}>
                    <MdDeleteOutline /> Eliminar usuario
                </ButtonCard>
            </WrapperContainer2>

            <TextCard className="bold italic" fontSize={20}>{item.name} {item.last_name}</TextCard>

            <TextCard fontSize={14} className="italic"><SpanCard fontSize={14}>Cedula de Ciudadania:</SpanCard> {item.id}</TextCard>

            <TextCard fontSize={14} className="italic"><SpanCard fontSize={14}>Correo:</SpanCard> {item.email}</TextCard>

            <TextCard fontSize={14} className="italic"><SpanCard fontSize={14}>Rol:</SpanCard> {item.role_name}</TextCard>
        </WrapperContainer1>
    );
}

export { UserCard };