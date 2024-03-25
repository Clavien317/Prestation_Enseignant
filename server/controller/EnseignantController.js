const enseignant = require("../models/connexion")


const ajout = async(req, res) =>
{
    const { matricule,nom,taux_H,nb_H } = req.body;
    if (!matricule || !nom || !taux_H || !nb_H) {
        return res.status(400).json("Tout le donnees sont requis");
    }
    try {
        await enseignant.create({ matricule,nom,taux_H,nb_H });
        res.send("Insertion réussie");
        console.log("1 enseignant(e) est ajouté(e) avec succès");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur serveur lors de l'insertion");
    }
}

const liste =async(req, res)=>
{
    const data = await enseignant.find()
    res.json({ "liste": data })
}

const modif=async(req, res)=>
{
    const id = req.params.id;
    const data = {
        matricule: req.body.matricule,
        nom: req.body.nom,
        taux_H: req.body.taux_H,
        nb_H: req.body.nb_H
    };
    try {
        const d = await enseignant.findByIdAndUpdate(id, data, { new: true });
        if (d) {
            res.json("Modifiée avec succès");
        } else {
            res.status(404).json("ID non trouvé");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur serveur");
    }
}

const supprimer=async(req, res)=>
{
    const id = req.params.id
    await enseignant.findOneAndDelete({ _id: id })
    res.json("Supprimee avec succes")
}


const mono = async(req,res)=>
 {
    const id = req.params.id
    const data = await enseignant.find({ _id: id })
    res.json({ "result": data })
}

module.exports = {ajout,liste,modif,supprimer,mono}