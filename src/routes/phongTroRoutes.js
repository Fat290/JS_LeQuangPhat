const express = require("express");
const PhongTroController = require("../controllers/PhongTroController");

const router = express.Router();

router.get("/", PhongTroController.getAll);
router.get("/search", PhongTroController.search);
router.post("/", PhongTroController.create);
router.delete("/:id", PhongTroController.delete);
router.delete("/", PhongTroController.deleteMultiple);
router.get("/hinhthucthanhtoan", PhongTroController.getHinhThucThanhToan);

module.exports = router;
