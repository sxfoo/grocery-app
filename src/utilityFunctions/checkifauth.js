import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebaseConfig";



const checkifauth = () => {
const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth, (authenticatedUser) => {
                if (authenticatedUser) {
                    setIsAuth(true); //If a user has logged in, it's set to true
                }
                else{
                    setIsAuth(false); //otherwise set to false
                }
            }
        );

        return () => unsubscribeAuthStateChanged();
    }, []);
    console.log('isAuth is' ,isAuth);
    return isAuth;
}

export default checkifauth;