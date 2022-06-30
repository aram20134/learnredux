import axios from 'axios'

export default async function getWeather (city, weather, setWeather) {
    const ex = []
    var temp = 0;
    var iter = 0;
    var description = '';
    var humidity = 0;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city[0].city}&appid=f1d00a3166819974610d8f9e6a11ddfd&units=metric&lang=ru`)
    .then((response) => response.data.list.map((list, i, arr) => {
        var day = new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(new Date(arr[i].dt_txt))
        var nextDay = new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(new Date(arr[i < arr.length-1 ? i+1 : i].dt_txt))
        day = day.charAt(0).toUpperCase() + day.slice(1)
        nextDay = nextDay.charAt(0).toUpperCase() + nextDay.slice(1)
        if (day === nextDay) {
          temp += arr[i].main.temp
          humidity += arr[i].main.humidity
          iter++;
        } else {
          description = list.weather[0].description
          ex.push(([{
            day: day,
            data: [{
                temp: temp/iter,
                humidity: humidity/iter,
                description: description
            }]
          }]))
          temp = 0;
          humidity = 0;
          iter = 0;
        }
        
      }))
      .catch((error) => {
        console.error(error.code); 
      })
      return ex.length > 0 ? ex : 'error'
}