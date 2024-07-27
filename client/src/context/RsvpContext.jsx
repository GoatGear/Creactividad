import { createContext, useContext, useState } from "react";
import {
    createRsvpRequest,
    getRsvpsRequest,
    deleteRsvpRequest,
    getRsvpRequest,
    updateRsvpRequest
} from "../api/rsvp";

const RsvpContext = createContext();

export const useRsvps = () => {
    const context = useContext(RsvpContext);

    if (!context) {
        throw new Error("useRsvp necesita provider");
    }
    return context;
}

export function RsvpProvider({ children }) {

    const [rsvps, setRsvps] = useState([]);

    const getRsvps = async () => {
        try {
            const res = await getRsvpsRequest()
            setRsvps(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const createRsvp = async (rsvp) => {
        const res = await createRsvpRequest(rsvp);
        console.log(res);
    }

    const deleteRsvp = async (id) => {
        try {
            const res = await deleteRsvpRequest(id);
            if (res.status === 204) setRsvps(rsvps.filter(rsvps => rsvps._id != id)) // Actualización de estado ;)
        } catch (error) {

        }
    }

    const getRsvp = async (id) => {
        try {
            const res = await getRsvpRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateRsvp = async (id, rsvp) => {
        try {
            await updateRsvpRequest(id, rsvp);  
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RsvpContext.Provider value={{
            rsvps,
            createRsvp,
            getRsvps,
            deleteRsvp,
            getRsvp,
            updateRsvp
        }}>
            {children}
        </RsvpContext.Provider>
    );
}