import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from "axios";

function Liste() {
  const [users, setUsers] = useState([]);
  const [maxSalaire, setMaxSalaire] = useState(0)
  const [minSalaire, setMinSalaire] = useState(0)


  const ListeEnseignants = async () => {
    try {
      const result = await axios.get("http://localhost:3000");
      const liste = result.data.liste
      setUsers(liste);

      console.log(liste);
      const Nb_H = []
      const Taux_H=[]
      const salaire = []


      liste.forEach((item) => {
        Nb_H.push(item.nb_H);
        Taux_H.push(item.taux_H);
        salaire.push(item.nb_H*item.taux_H)
    })

      console.log(" Nombre d'heure",Nb_H);
      console.log("Taux horaire ",Taux_H);
      console.log("Karama ",salaire);

      const n = salaire.length
      let maxSalaire = 0
      let minSalaire= Infinity

      for (let i = 0; i < n; i++) {
          console.log("Salaire", salaire[i]);
          maxSalaire = Math.max(maxSalaire, salaire[i]);
          minSalaire = Math.min(minSalaire, salaire[i]);
      }
      
      setMaxSalaire(maxSalaire)
      setMinSalaire(minSalaire)
      

    } catch (error) {
      console.error("Erreur lors de la récupération des enseignants:", error);
    }
  };

  useEffect(() => {
    ListeEnseignants();
  }, []);

  const supprimer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      alert("Enseignant supprimé avec succès !");
      ListeEnseignants();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'enseignant:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Liste des enseignants</h1>
        <button className='btn-add'><a href="/add_enseignant">Ajouter</a></button>
        <br />
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Taux horaire</th>
              <th>Nombre d'heure</th>
              <th>Prestation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, i) => (
              <tr key={i}>
                <td>{data.matricule}</td>
                <td>{data.nom}</td>
                <td>{data.taux_H}</td>
                <td>{data.nb_H}</td>
                <td>{data.taux_H*data.nb_H}</td>
                <td>
                  <button onClick={() => supprimer(data._id)}>Supprimer</button>
                  <button><a href={`/modification/${data._id}`}>Modifier</a></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />

        <h2>Prestation maximum : {maxSalaire}</h2>
        <h3>Prestation minimal : {minSalaire}</h3>
      </div>
    </div>
  );
}

export default Liste;
