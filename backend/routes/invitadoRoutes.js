const express = require("express");
const {
  addAttendant,
  confirmAttendance,
  getInvitados,
} = require("../controllers/invitadoController");

const router = express.Router();

router.get("/", getInvitados);
router.post("/", addAttendant);
router.patch("/:id/confirmar", confirmAttendance);

module.exports = router;
