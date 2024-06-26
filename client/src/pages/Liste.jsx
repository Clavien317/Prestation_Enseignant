import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from "axios";
import Swal from 'sweetalert2'
import {FaTrash,FaEdit, FaPlus} from 'react-icons/fa'


function Liste() {
  const [users, setUsers] = useState([]);
  const [maxSalaire, setMaxSalaire] = useState(0)
  const [minSalaire, setMinSalaire] = useState(0)
  const [total,setTotal] = useState(0)


  const ListeEnseignants = async () => {
    try {
      const result = await axios.get("http://localhost:3000");
      const liste = result.data.liste
      setUsers(liste);
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
      let somme=0

      for (let i = 0; i < n; i++) {
          console.log("Salaire", salaire[i]);
          somme+=salaire[i]
          maxSalaire = Math.max(maxSalaire, salaire[i]);
          minSalaire = Math.min(minSalaire, salaire[i]);
      }
      
      setMaxSalaire(maxSalaire)
      setMinSalaire(minSalaire)
      setTotal(somme)
      

    } catch (error) {
      console.error("Erreur lors de la récupération des enseignants:", error);
    }
  };

  useEffect(() => {
    ListeEnseignants();
  }, []);
  
  const supprimer=(id)=>
  {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/${id}`)
          .then(() => {
            Swal.fire('Supprimé!', '1 plante a été supprimé.', 'success');
            ListeEnseignants();
          })
          .catch((error) => {
            Swal.fire('Erreur', 'La suppression a échoué : ' + error.message, 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'Votre élément est en sécurité :)', 'info');
      }
    });
  }

  return (
    <div>
      <Navbar />


        {
          users !=null ?(
          <>
      <div className='container'>
        <h1>Liste des enseignants</h1>
        <hr className='line' />
        <button className='btn-add'><a href="/add_enseignant"><FaPlus /> Ajouter</a></button>
        <br />
          <div className="affichage">
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
                    <td>{data.prestation}</td>
                    <td>
                      <button className='del' onClick={() => supprimer(data._id)}><FaTrash />Supprimer</button>
                      <button className='modif'><a className='update' href={`/modification/${data._id}`}><FaEdit />Modifier</a></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />
            <hr />
          </div>

        <br />
        <br />

              <div className="stat">
                <h2>Total : <span>{total} Ariary</span> </h2>
                <br />
                <h2>Prestation maximum : <span>{maxSalaire} Ariary</span></h2>
                <br />
                <h2>Prestation minimum : <span>{minSalaire} Ariary</span></h2>
              </div>
              <br />
    </div>

          </>)
          :
          (<>
            <h1>Aucun enseignant enregistré</h1>
          </>)
        }

    </div>
  );
}

export default Liste;
