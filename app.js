const searchBar = document.getElementById('search')
const serachBtn = document.getElementById('submit')
const selectedCity = document.getElementById('city')
const temperature = document.getElementById('temp')
const extrainfo = document.getElementById('extra-info')
const celsius = document.getElementById('celsius')
const fahrenheit = document.getElementById('fahrenheit')


const c = 273.15
const f = 459.67
let unit = c

serachBtn.addEventListener('click', () =>{
    cityWeather(searchBar.value)
    
})

celsius.addEventListener('click', () => {
    cityWeather(searchBar.value)
    return unit = c
})

fahrenheit.addEventListener('click', () =>{
    cityWeather(searchBar.value)
    return unit = f
})

async function cityWeather(city){
    const apiKey = "20e0fdebbe3c0828b9c8c745daa86c3c"

   try{
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )

    const data = await res.json()
    updateUI(data)

   }catch(err){
    const message = document.createElement('div')
    message.classList.add('error')
    message.innerText = "City Not Found"
    
    document.body.appendChild(message)
    setInterval(() =>{message.remove()}, 3000)
   }

    
}

// kelvin to celsius k - 273.15
// kelvin to f k - 459.67



function updateUI(data){
    selectedCity.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i>${data.name}`
    
    if(unit === c){
        temperature.innerHTML = `<i class="fa fa-thermometer-empty" aria-hidden="true"></i>${Math.floor((data.main.temp) - c)} &#8451;`
    }else if(unit === f){
        temperature.innerHTML = `<i class="fa fa-thermometer-empty" aria-hidden="true"></i>${Math.floor((data.main.temp) - f)} &#8457;`
    }

    extrainfo.innerHTML = `
    <div>
    <i class="fa fa-info-circle" aria-hidden="true"></i>
    <p>Humidity: ${data.main.humidity}</p>
    <p>Sky: ${data.weather[0].description}</p>
    </div>
    
    
    `
}


