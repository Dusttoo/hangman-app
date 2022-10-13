const LOAD_WORD = 'sentence/loadWord';

const loadWord = (word) => ({
    type: LOAD_WORD,
    word
})

export const getWord = () => async (dispatch) => {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const word = await response.json();
    dispatch(loadWord(word))
}

const initialState = {};

const wordReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_WORD:
            const newState = { ...state };
            action.word.forEach(word => {
                newState[word.id] = word;
            });
            return newState
        default:
            return state
    }
}

export default wordReducer;