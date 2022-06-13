const request = require('request')

const animes = (anime, callback) => {
    //const animeUrl = 'https://animechan.vercel.app/api/random'
    
    const animeUrl = 'https://animechan.vercel.app/api/quotes/anime?title=' + anime
    request({url: animeUrl, json: true}, (error, response) => {
        console.log('res - ' + response)
        console.log('erro - ' + error)
        
        if(error){
            return callback('Anime not found',undefined)
        }else if(response.body.error == 'No related quotes found!'){
            callback('Anime not found',undefined)
        }else{
            const numbersQuotes = (response.body).length   
        
            //randomQuotes =  rQ
            const rQ = Math.floor(Math.random() * numbersQuotes)
            callback(undefined, {
                aniName :response.body[rQ].anime,
                aniCharName :response.body[rQ].character,
                aniQuot :response.body[rQ].quote
            })
        }


        }
    )
}

module.exports={
    animes:animes
}