import jwtEncode from "jwt-encode"
import { jwtDecode } from "jwt-decode"

const SECRET_KEY = "You can't see me";

export const encodeToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, 
    };
    return jwtEncode(payload , SECRET_KEY)
};

export const decodeToken = () => {
    const token = localStorage.getItem("token")
    if (!token)
        return null;
    try {
        const decoded = jwtDecode(token)
        if (decoded.exp < Math.floor(Date.now() / 1000)) { 
            logoutUser();
            return null;
        }
        return decoded;
    }
    catch (error) {
        console.log("Invalid Token");
        return null;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}