const http = require('http')
const fetch = require('node-fetch')

const server = http.createServer( async (req, res) => {
  let myPhrase = await getPhrase('https://fe.it-academy.by/Examples/words_tree/root.txt')

  res.end(`<h1>${myPhrase}</h1>`)
})

async function getPhrase(url) {
  let phrase =[]
  let urlBase = 'https://fe.it-academy.by/Examples/words_tree/'
  let response = await fetch(url)
  let candidate = await response.text()
  if(candidate.includes('txt')) {
    let urlList = JSON.parse(candidate)
    for(let i = 0; i < urlList.length; i++) {
      let response = await fetch(new URL(urlList[i], urlBase))
      if(response.status != 200) continue
      let candidate = await response.text()
      if(candidate.includes('txt')) {
        let urlList = JSON.parse(candidate)
        for(let j = 0; j < urlList.length; j++) {
          let response = await fetch(new URL(urlList[j], urlBase))
          if(response.status != 200) continue
          let candidate = await response.text()
          if(candidate.includes('txt')) {
            let urlList = JSON.parse(candidate)
            for(let k = 0; k < urlList.length; k++) {
              let response = await fetch(new URL(urlList[k], urlBase))
              if(response.status != 200) continue
              let candidate = await response.text()
              phrase.push(candidate)
            }
          } else {
            phrase.push(candidate)
          }
        }
      } else {
        phrase.push(candidate)
      }
    }
  } else {
    phrase.push(candidate)
  }
  return phrase.join(' ')
}

server.listen(3000, () => {
  console.log('server is running')
})
