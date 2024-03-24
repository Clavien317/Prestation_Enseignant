import React from 'react'

function Navbar() {
  return (
    <div>
        <header>
            <h1 className="logo">LOGO</h1>
            <nav>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/liste">Liste enseignant</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar