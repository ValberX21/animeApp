const express = require('express')
const path = require('path')
const app =  express()
const hbs = require('hbs')
const callAnimesApi =  require('./utils/animeChan')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partalsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partalsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Anime app',
        author:' Valberx21',
        email:'Contatc us: firstpalaceii@gmail.com'
    })
})

app.get('/anime', (req, res) => {
    const userAnime = req.query.aniName

    if(!userAnime){
        return res.send({
            error:'Please type a anime'
        })
    }

    callAnimesApi.animes(req.query.aniName, (erro, resulta)=>{
        //console.log(erro == 'Anime not found')
        if(erro == 'Anime not found'){
            console.log('aqui estamos')
            res.send({
            aniNotFound: erro
           })
        }else if(erro == 'Internal Server Error'){
            res.send({
                aniNotFound: erro
            })
        }else{
            res.send({
                aniName :resulta.aniName,
                aniCharName :resulta.aniCharName,
                aniQuot :resulta.aniQuot
            })
        }
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'Avalible in next version'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Avalible in next version'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        erroMenssage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is UP')
})