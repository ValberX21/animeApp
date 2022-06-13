console.log('CLIENT SIDE JS');

const AnimeForm = document.querySelector('form')
const search = document.querySelector('input')
const searchAnime = document.querySelector('searchAnime')
const txtanimeName =  document.querySelector('#txtanimeName')
const txtCharName =  document.querySelector('#txtCharName')
const txtQuotesName =  document.querySelector('#txtQuotesName')
const txtAnimeNotound = document.querySelector('#txtAnimeNotound')

AnimeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    txtanimeName.textContent = ''
    txtCharName.textContent = ''
    txtQuotesName.textContent = ''
    txtAnimeNotound.textContent = ''

    const animeName = search.value;

    if(animeName == ""){
        alert('Please type a anime')
    }

    fetch('/anime?aniName=' + animeName).then((response) =>{
        response.json().then((data)=>{
            if(data.aniNotFound){
                txtAnimeNotound.textContent = data.aniNotFound
            }else{
                txtanimeName.textContent =  data.aniName
                txtCharName.textContent =  data.aniCharName
                txtQuotesName.textContent =  data.aniQuot
            }  
        })
    })
})

//document.getElementById("clickMe").onclick = function () { alert('hello!'); };

// searchAnime.getElementById("searchAnime").onclick = function () { alert('hello seach!'); };

// animeAdd.getElementById("clickAdd").onclick = function () { alert('hello!'); };