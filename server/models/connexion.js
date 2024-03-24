const mongoose = require("mongoose");


// Connexion à MongoDB
const url = "mongodb://localhost:27017/tp";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Base de données connectée!");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données:", err);
    });
const schema = new mongoose.Schema({
    matricule:
    {
        type: String,
        required: true
    },
    nom:
    {
        type: String,
        required: true
    },
    taux_H:
    {
        type: Number,
        required: true
    },
    nb_H:
    {
        type: Number,
        required: true
    }
});

const enseignant = mongoose.model("enseignant", schema);

module.exports = enseignant