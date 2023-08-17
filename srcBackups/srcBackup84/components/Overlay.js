import { React, useState, createContext, useEffect } from "react";
import OverlayContent from "./OverlayContent";
import Portal from "./Portal";
import ViewAllPosts from "./ViewAllPosts";
import { useOverlay } from "./OverlayState";


function Overlay({ overlayId, user }) {

    console.log('Overlay.js received overlayId: ' + overlayId);
    const { updateOverlay, getOverlay } = useOverlay();


    useEffect(() => {
        console.log('overlay.js useEffect overlayID : ' + overlayId);
    }, [])

    if (getOverlay()) {
        return (
            <div>
                {getOverlay() &&
                    <Portal>
                        <OverlayContent
                            overlayId={overlayId}
                            user={user}

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