import Rsvp from "../models/rsvp.model.js";

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
    const { title, description, date } = req.body;
    try {
        const newRsvp = new Rsvp({
            title,
            description,
            date,
            user: req.user.id,
        })
        const savedRsvp = await newRsvp.save()
        // enviar correo req.user.email
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