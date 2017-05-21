import {SET_LYRICS} from '../constants'

export const setLyrics = function(text) {
    return {
        type: SET_LYRICS,
        lyric: text
    }
}



// Two things to note:
//   1. We use Object.assign to maintain immutability.
//      Since our state only has one key on it, it doesn't matter much, but what if we added more?
//   2. If we receive an action that doesn't have a type we recognize, we return the previous state
