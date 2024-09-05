import Beca from '../models/beca.model.js';

export const crearBeca = async (req, res) => {
    //res.status(200).json({message: 'crear'})
    const { beca } = req.body;
    try {
        const newBeca = new Beca({
            beca
        })
        const savedBeca = await newBeca.save();
        res.json(savedBeca)
    } catch (error) {
        return res.status(404).json({ message: "Introduce una beca" })
    }

};

export const validateBeca = async (req, res) => {
    const { beca } = req.body;
    if (!beca) {
        return res.status(400).json({ message: "El campo beca no puede estar vacío" });
    }

    try {
        // Supongamos que quieres verificar si la beca existe en la base de datos
        const becaEncontrada = await Beca.findOne({ beca });

        if (!becaEncontrada) {
            return res.status(404).json({ message: "Beca no válida o no encontrada" });
        }

        // Si la beca es válida
        return res.json({ message: "Beca válida", beca: becaEncontrada });
    } catch (error) {
        return res.status(500).json({ message: "Error al validar la beca" });
    }
};

export const createRandomBecas = async (req, res) => {
    res.status(200).json({message: 'crearVarios'})
}