import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import "../form.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

function Modification() {
  const [input, setInput] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  const [info, setInfo] = useState([])

  const uneData = async () => {
    try {
      const mono = await axios.get(`http://localhost:3000/${id}`)
      const enseignant = mono.data.result
      setInfo(enseignant)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    uneData()
  }, [])

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setInput(values => ({ ...values, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/${id}`, input);
      alert(response.data)
      navigate("/liste")
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className='inscrir'>
          <fieldset>
            <legend>Modification Enseignant</legend>
            <form action="" onSubmit={submit}>
              <br />
              <br />

              {
                info && info.map((item, i) => { // Modification ici
                  return (
                    <div key={i}>
                      <label htmlFor="">Matricule</label>
                      <br />
                      <input type="text" defaultValue={item.matricule} name='matricule' onChange={change} />
                      <br />
                      <br />
                      <label htmlFor="">Nom</label>
                      <br />
                      <input type="text" defaultValue={item.nom} name='nom' onChange={change} />
                      <br />
                      <br />
                      <label htmlFor="">Taux_H</label>
                      <br />
                      <input type="text" defaultValue={item.taux_H} name='taux_H' onChange={change} />
                      <br />
                      <br />
                      <label htmlFor="">Nombre d'heure</label>
                      <br />
                      <input type="text" defaultValue={item.nb_H} name='nb_H' onChange={change} />
                      <br />
                      <br />
                      <br />
                      <br />
                      <button> Modifier</button>
                      <br />
                      <br />
                    </div>
                  )
                })
              }

            </form>
          </fieldset>
        </div>

      </div>
    </div>
  )
}

export default Modification
