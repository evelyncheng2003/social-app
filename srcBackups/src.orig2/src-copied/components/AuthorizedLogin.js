import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

let subject = null;



export const useAuthorizedLogin = () => {
    const [approved, setApproved] = useState(true);

    if (!subject) {
        subject = new BehaviorSubject(true);
    }

    useEffect(() => {
        const subscription = subject.subscribe((loginStatus) => {
            setApproved(loginStatus);
        });
    }, []);

    function updateLoginStatus(status) {
        console.log('authorizedLogin() updateLoginStatus to ' + status);
        subject.next(status);
    }

    function getLoginStatus() {
        if (!subject) {
            return undefined;
        }
        return subject.value;
    }

    return { updateLoginStatus, getLoginStatus };
}



