function changeWeather () {
  const input = document.getElementById('weather-input')
  document.getElementById('weather-img').src = `https://wttr.in/${input.value}_0pq_transparency=200_lang=de.png`
  input.value = ''
}

document.getElementById('weather-btn').onclick = () => changeWeather()

document.getElementById('weather-form').onkeypress = event => {
  if (event.keyCode === 13) {
    event.preventDefault()
    changeWeather()
  }
}
