const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

// Obtener todos los prospectos
router.get('/prospectos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prospectos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un prospecto por ID
router.get('/prospectos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM prospectos WHERE idProspecto = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Prospecto no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo prospecto
router.post('/prospectos', async (req, res) => {
    const { Name, LastName, Phone, Email } = req.body;

    if (!Name || !LastName || !Phone || !Email) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO prospectos (Name, LastName, Phone, Email) VALUES (?, ?, ?, ?)',
            [Name, LastName, Phone, Email]
        );
        res.json({ idProspecto: result.insertId, Name, LastName, Phone, Email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un prospecto
router.put('/prospectos/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, LastName, Phone, Email } = req.body;

    if (!Name || !LastName || !Phone || !Email) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE prospectos SET Name = ?, LastName = ?, Phone = ?, Email = ? WHERE idProspecto = ?',
            [Name, LastName, Phone, Email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Prospecto no encontrado' });
        }

        res.json({ message: 'Prospecto actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar un prospecto
router.delete('/prospectos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM prospectos WHERE idProspecto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Prospecto no encontrado' });
        }

        res.json({ message: 'Prospecto eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
