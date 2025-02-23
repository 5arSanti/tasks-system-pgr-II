/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FadeWrapper } from "../FadeWrapper";
import { SpanCard, TextCard } from "../TextComponents";
import { WrapperContainer3 } from "../WrapperContainers";

import "./styles.css";

const LogInfoCard = ({
    icon, 
    title, 
    text, 
    fontSize=12, 
    width="100%", 
    padding=20, 
    gap=10,
    onClick= () => {}
}) => {
    return(
        <div style={{ width: "100%" }} onClick={onClick}>
            <FadeWrapper width={width}>
                <WrapperContainer3 width={width} height="100%" flexDirection="column" gap={gap} justifyContent="center" padding={padding} className="log-info-card">
                    {icon || ""}

                    <TextCard textAlign="center">
                        <SpanCard className={"italic"} fontSize={14}>
                            {title}
                        </SpanCard>
                    </TextCard>

                    <TextCard fontSize={fontSize} className="bold" textAlign="center">
                        {text}
                    </TextCard>

                </WrapperContainer3>
            </FadeWrapper>
        </div>
    );
}

export { LogInfoCard };