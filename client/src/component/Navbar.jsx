import React from 'react'

function Navbar() {
  return (
    <div>
        <header>
            <div className="logo">
              <img src="/301233346_455362809937832_3213526383772469179_n.jpg" alt="" />
            </div>
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