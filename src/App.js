import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helpers';
import { getWord } from './store/sentence';
function App() {
  let selectedWord = useSelector((state) => state.word.word)
  const hint = useSelector((state) => state.word.hint)
  const dispatch = useDispatch()
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [revealHint, setRevealHint] = useState(false)
  // console.log(selectedWord)

  useEffect(() => {
    dispatch(getWord())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if(!loaded) return
    const handleKeyPress = event => {
      const {key, keyCode} = event;
        if (playable && keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
          const letter = key.toLowerCase();

          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter])
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter])
            } else {
              show(setShowNotification);
            }
          }
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedWord, correctLetters, wrongLetters, playable, loaded])

  const playAgain = async () => {
    setLoaded(false)
    setPlayable(true);
    setCorrectLetters([])
    setWrongLetters([])
    dispatch(getWord())
    setRevealHint(false)
    setLoaded(true)
  }
  return (
    <>
    {selectedWord && loaded ?
    <>
          <Header hint={hint} revealHint={revealHint} setRevealHint={setRevealHint}/>
          <div className='game-container'>
            <Figure wrongLetters={wrongLetters}/>
            <WrongLetters wrongLetters={wrongLetters}/>
            <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
          </div>
            <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} 
            setPlayable={setPlayable} playAgain={playAgain}/>
            <Notification showNotification={showNotification}/>
    </> :
    <h1>Fetching your word...</h1>
  }

    </>
  );
}

export default App;
