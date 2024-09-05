import Rsvp from "../models/rsvp.model.js";
import User from "../models/user.model.js";
import { sendRsvpEmail } from '../services/emailRsvp.service.js';

export const getRsvps = async (req, res) => {
    try {
        let rsvps;
        if (req.user.role === "admin") {
            rsvps = await Rsvp.find({}).populate('user');
        } else {
            rsvps = await Rsvp.find({ user: req.user.id }).populate('user');
        }
        res.json(rsvps);
    } catch (error) {
        return res.status(404).json({ message: "No se logró" })
    }
};

export const createRsvp = async (req, res) => {
    const { title, description, reservacion, beca, a1, a2, a3, date } = req.body;
    const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        console.log(user);
    try {
        const newRsvp = new Rsvp({
            title,
            description,
            reservacion,
            beca,
            a1,
            a2,
            a3,
            date,
            user: req.user.id,
        })
        const savedRsvp = await newRsvp.save();
        //await sendRsvpEmail(user);
        res.json(savedRsvp)
    } catch (error) {
        return res.status(404).json({ message: "No se logró" })
    }
};

export const getRsvp = async (req, res) => {
    try {
        const rsvp = await Rsvp.findById(req.params.id).populate('user');
        if (!rsvp) return res.status(404).json({ message: 'No encontrada' })
        res.json(rsvp)
    } catch (error) {
        return res.status(404).json({ message: "Reservación no encontrada" })
    }
};

export const deleteRsvp = async (req, res) => {
    try {
        const rsvp = await Rsvp.findByIdAndDelete(req.params.id)
        if (!rsvp) return res.status(404).json({ message: 'No encontrada' })
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Reservación no encontrada" })
    }
};


export const updateRsvp = async (req, res) => {
    try {
        const rsvp = await Rsvp.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!rsvp) return res.status(404).json({ message: 'no encontrada' })
        res.json(rsvp)
    } catch (error) {
        return res.status(404).json({ message: "Reservación no encontrada" })
    }

};