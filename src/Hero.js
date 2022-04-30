import React from 'react'

export default function Hero({handleLogout,user}) {
  return (
    <div>
        <section className='hero'>
      <nav>
      <h2>Welcome to Patient's Database of Apollo Hospital</h2>
      <button onClick={handleLogout}>Logout</button>
      </nav>
        </section>
    </div>
  )
}
