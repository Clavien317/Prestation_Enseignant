const router = require("express").Router()
const {ajout,liste, modif, supprimer, mono} = require("../controller/EnseignantController")




router.post("/ajout",ajout)
router.get("/",liste)
router.put("/:id",modif)
router.delete("/:id",supprimer)
router.get("/:id",mono)




module.exports = router