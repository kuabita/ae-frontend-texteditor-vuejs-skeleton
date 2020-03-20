import axios from "axios";

export default class DatamuseService {
  getSynonyms(word) {
    const LIMIT_WORDS = 4;
    const PATH = 'https://api.datamuse.com/words';

    return axios.get(PATH, {
      params: {
        ml: word,
        max: LIMIT_WORDS
      }
    })
  }
}
