import axios from 'axios'

const requestPlugin = {
  getCharacters () {
    return new Promise(function (resolve, reject) {
      axios.get('https://rickandmortyapi.com/api/character').then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log('error: ', e)
        reject(e)
      })
    })
  },
  getCharacterByPage (actPage) {
    return new Promise(function (resolve, reject) {
      axios.get('https://rickandmortyapi.com/api/character/?page=' + actPage).then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log('error: ', e)
        reject(e)
      })
    })
  },
  getLocations () {
    return new Promise(function (resolve, reject) {
      axios.get('https://rickandmortyapi.com/api/location').then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log('error: ', e)
        reject(e)
      })
    })
  },
  getEpisodes (ids) {
    return new Promise(function (resolve, reject) {
      axios.get('https://rickandmortyapi.com/api/episode/' + ids).then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log('error: ', e)
        reject(e)
      })
    })
  },
  getFilteredCharacters (filterType, filter) {
    return new Promise(function (resolve, reject) {
      axios.get('https://rickandmortyapi.com/api/character/?' + filterType + '=' + filter).then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log('error: ', e)
        reject(e)
      })
    })
  }
}
export default requestPlugin
