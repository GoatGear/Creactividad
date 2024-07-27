import axios from "./axios";

export const getRsvpsRequest = () => axios.get('/rsvps');

export const getAllRsvpsRequest = () => axios.get('/allRsvps'); // All

export const getRsvpRequest = (id) => axios.get(`/rsvp/${id}`);

export const createRsvpRequest = (rsvp) => axios.post('/rsvps', rsvp);

export const updateRsvpRequest = (id, rsvp) => axios.put(`/rsvp/${id}`, rsvp);

export const deleteRsvpRequest = (id) => axios.delete(`/rsvp/${id}`);