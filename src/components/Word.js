import React from 'react'

const Word = ({selectedWord, correctLetters}) => {
  return (
    <div className="word">
        {selectedWord.split('').map((letter, i) => {
            return (
              <div key={i}>
                {letter === ' ' ? <span className='space'></span> : 
                <span className="letter">
                      {correctLetters.includes(letter) ? letter : ''}
                  </span>
                }
               </div> 
            )
        }   
		)}
    </div>
  )
}

export default Word