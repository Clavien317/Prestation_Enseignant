import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import "../form.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'




function Ajout() {

  const [input,setInput] = useState({})
  const navigate = useNavigate()
  const change=(e)=>
  {
      const name = e.target.name;
      const value = e.target.value
      setInput(values=>({...values,[name]:value}))
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/ajout", input);
        Swal.fire({
          title: 'Succès !',
          text: `${response.data} !`,
          icon: 'success',
        });
        navigate("/liste")

    }catch(e)
    {
      console.log(e);
    }
  }

  return (
    <div>
        <Navbar />
        <div className="container">
      <div className='inscrir'>
        <fieldset>
            <legend>Ajouter Enseignant</legend>
                <form action="" onSubmit={submit}>
                    <br />
                    <br />
                    <label htmlFor="">Matricule</label>
                    <br />
                    <input type="text" name='matricule' onChange={change}/>
                    <br />
                    <br />
                    <label htmlFor="">Nom</label>
                    <br />
                    <input type="text" name='nom' onChange={change}/>
                    <br />
                    <br />
                    <label htmlFor="">Taux_H</label>
                    <br />
                    <input type="number" name='taux_H' onChange={change}/>
                    <br />
                    <br />
                    <label htmlFor="">Nombre d'heure</label>
                    <br />
                    <input type="number" name='nb_H' onChange={change}/>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button> Ajouter</button>
                    <br />
                    <br />
                </form>
        </fieldset>
    </div>

        </div>
    </div>
  )
}

export default Ajout