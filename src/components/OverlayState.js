import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

let subject = null;



export const useOverlay = () => {
    const [overlay, setOverlay] = useState(true);

    if (!subject) {
        subject = new BehaviorSubject(true);
    }

    useEffect(() => {
        const subscription = subject.subscribe((overlay) => {
            setOverlay(overlay);
        });
    }, []);

    function updateOverlay(overlayStatus) {
        console.log('OverlayState() updateOverlay to ' + overlayStatus);
        subject.next(overlayStatus);
    }

    function getOverlay() {
        if (!subject) {
            return undefined;
        }
        return subject.value;
    }

    return { updateOverlay, getOverlay };
}





