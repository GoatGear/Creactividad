import User from '../models/user.model.js';
import Rsvp from '../models/rsvp.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        return res.status(404).json({ message: "No se logró" })
    }
}

export const registerUser = async (req, res) => {
    const { nombre, apellido, profesion, especialidad, correo, password, role } = req.body

    try {
        const userFound = await User.findOne({ correo });
        if (userFound)
            return res.status(400).json(["El correo ya está en uso"]);
       
        const newUser = new User({
            nombre,
            apellido,
            profesion,
            especialidad,
            correo,
            password,
            role
        });
        const userSaved = await newUser.save();
        
        // correo registro
        //await sendConfirmationEmail(userSaved);

        res.json({
            id: userSaved._id,
            nombre: userSaved.nombre,
            apellido: userSaved.apellido,
            profesion: userSaved.profesion,
            especialidad: userSaved.especialidad,
            correo: userSaved.correo,
            role: userSaved.role,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ message: 'Error' })
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Reservación no encontrada" })
    }
}

export const createRsvpAdmin = async (req, res) => {
    //console.log('Datos recibidos en el backend:', req.body);

    const { title, description, reservacion, beca, a1, a2, a3, date, user } = req.body;

    // Verificar si el usuario especificado existe
    const userFound = await User.findById(user);
    if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

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
            user
        });

        const savedRsvp = await newRsvp.save();
        res.json(savedRsvp);
    } catch (error) {
        console.error(error);  // Para depuración
        return res.status(500).json({ message: "No se logró crear la reservación" });
    }
};
