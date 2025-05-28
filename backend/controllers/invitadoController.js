const Invitado = require("../models/Invitado");

//
exports.getInvitados = async (req, res) => {
  try {
    const invitados = await Invitado.find();
    return res.json(invitados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

// Agregar un nuevo invitado
exports.addAttendant = async (req, res) => {
  try {
    const {name} = req.body;
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({error: true, message: "El nombre del invitado es obligatorio"});
    }

    const nuevoInvitado = new Invitado({name: name.trim()});
    const savedInvitado = await nuevoInvitado.save();

    return res.status(201).json({
      error: false,
      invitado: savedInvitado,
      message: "Invitado agregado con éxito",
    });
  } catch (error) {
    return res
      .status(500)
      .json({error: true, message: "Error interno del servidor"});
  }
};

// Confirma la asistencia de un invitado
exports.confirmAttendance = async (req, res) => {
  try {
    const {id} = req.params;
    const invitado = await Invitado.findByIdAndUpdate(
      id,
      {accepted: true},
      {new: true}
    );

    if (!invitado) {
      return res
        .status(404)
        .json({error: true, message: "Invitado no encontrado"});
    }

    return res.json({error: false, invitado, message: "Asistencia confirmada"});
  } catch (error) {
    return res
      .status(500)
      .json({error: true, message: "Error interno del servidor"});
  }
};
