import { React, useState, createContext } from "react";
import OverlayContent from "./OverlayContent";
import Portal from "./Portal";
import ViewAllPosts from "./ViewAllPosts";
import { useOverlay } from "./OverlayState";


function Overlay({ overlayId, email }) {

    console.log('Overlay.js received overlayId: ' + overlayId);
    const { updateOverlay, getOverlay } = useOverlay();


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
        //console.log('close overlay from Overlay.js called')
        //console.log('closer overlay id is: ' + overlayId);
        return (
            < ViewAllPosts />
        )
    }


}

export default Overlay;