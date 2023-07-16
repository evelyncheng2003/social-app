import { React, useState, createContext } from "react";
import OverlayContent from "./OverlayContent";
import Portal from "./Portal";
import ViewAllPosts from "./ViewAllPosts";
import { useOverlay } from "./OverlayState";


function Overlay({ overlayId, email }) {
    //const [overlay, setOverlay] = useState(true);

    //const { overlay } = useOverlay();

    const { updateOverlay, getOverlay } = useOverlay();

    console.log('Overlay() overlay state is: ' + getOverlay());

    // const closeOverlay = () => {
    //     setOverlay(false)
    // }

    if (getOverlay()) {
        return (
            <div>
                {getOverlay() &&
                    <Portal>
                        <OverlayContent
                            overlayId={overlayId}
                            email={email}

                        />
                    </Portal>
                }

            </div>
        )
    } else {
        return (
            <ViewAllPosts

            />
        )
    }


}

export default Overlay;