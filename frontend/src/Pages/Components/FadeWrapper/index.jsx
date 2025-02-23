import { Fade } from "react-awesome-reveal";

const FadeWrapper = ({children, width="100%"}) => {
    return(
        <Fade style={{width: width}} cascade={true} damping={1} delay={100}>
            {children}
        </Fade>
    );
}

export { FadeWrapper };