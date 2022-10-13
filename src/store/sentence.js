const LOAD_WORD = 'sentence/loadWord';
const LOAD_HINT = 'sentence/loadHint'

const loadWord = (word) => ({
    type: LOAD_WORD,
    word
})

const loadHint = (hint) => ({
  type: LOAD_HINT,
  hint
})

export const getWord = () => async (dispatch) => {
  console.log('env: ', process.env.REACT_APP_WORDS_API_KEY)

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_WORDS_API_KEY}`,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
    const response = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
    const word = await response.json();
    console.log('results', word.results[0].definition)
    dispatch(loadWord(word.word))
    dispatch(loadHint(word.results[0].definition))
    return word.word
}

const initialState = {};

const wordReducer = (state = initialState, action) => {
  console.log(action)  
  switch(action.type) {
        case LOAD_WORD:
            const newState = { ...state };
            newState['word'] = action.word;
            return newState
        case LOAD_HINT:
          const hintState = { ...state };
          hintState['hint'] = action.hint;
          return hintState
        default:
            return state
    }
}

export default wordReducer;