import { TextCard } from "../../TextComponents";
import { WrapperContainer1 } from "../../WrapperContainers";

const SubjectCard = ({ item={} }) => {
    return (
        <WrapperContainer1>
            <TextCard className="bold italic" fontSize={18}>{item.name}</TextCard>
        </WrapperContainer1>
    );
}

export { SubjectCard }