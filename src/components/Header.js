import React, { useState } from 'react'

const Header = ({hint, revealHint, setRevealHint}) => {
  return (
    <>
    <h1>Hangman</h1>
    <p>Find the hidden word - Enter a letter</p>
    {!revealHint ? <button
    onClick={() => {setRevealHint(!revealHint)}}>Need a hint?</button>
    : <p>{hint}</p>}
    </>
  )
}

export default Header