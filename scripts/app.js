const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon')
const forecast = new Forecast()

console.log(forecast);

const updateUI = (data) => {
    const cityDets = data.cityDets
    const weather = data.weather

    details.innerHTML = `
        <h5 class="my-3">${cityDets.LocalizedName}</h5>
        <div class="my-3">${weather[0].WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather[0].Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    
    let iconSrc = `/img/icons/${weather[0].WeatherIcon}.svg`

    icon.innerHTML = `<img src="${iconSrc}">`

    let timeSrc = weather[0].IsDayTime ? '/img/day.jpeg': '/img/night.jpeg' ;
    if(weather[0].IsDayTime === true) {
        timeSrc = '/img/day.jpeg'
    } else {
        timeSrc ='/img/night.jpeg'
    }
    time.setAttribute('src', timeSrc)
    

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

// const updateCity = async(city) => {
//     // const cityDets = await getCity(city)
//     // const weather = await getWeather(cityDets.Key)

//     // return {
//     //     cityDets: cityDets,
//     //     weather : weather 
//     // }
// }

cityForm.addEventListener('submit', (e) => {
    e.preventDefault()
   const city = document.querySelector('#city').value.trim()
   cityForm.reset()
   

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
   

    localStorage.setItem('city', city)
})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}

// const rem = (str) => {
//     str =str.slice(1, -1)
//     console.log(str);
// }

// rem('retek')


// let myAr = [1, 6, 9, -4, -1, 4]
// let s =0
// for(i=0; i<myAr.length; i++) {
    
//     if(myAr[i] > 0) {
//         s += myAr[i]
//     } else {
        
//     }
// }
// console.log(s);