const API_key = "64cc3e30b536e56788ce9a3d7d600f02";

const SEARCH = document.querySelector('.search button');

SEARCH.addEventListener("click" , get_my_details);

async function get_my_details() {

  const city = document.querySelector('.CITY_SEARCH').value;


const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;

try{
  console.log("loading resources");

  const Response = await fetch(url);

  const data_retrived =  await Response.json();
  
  if (!Response.ok) {
  throw new Error("Network response failed");
}

  if (data_retrived.cod === "404") {
  alert("City not found ❌ Please enter a valid city name.");
  return;
}
  console.log(data_retrived);

  document.querySelector('.CITY_NAME').innerHTML = city;
  document.querySelector('.TEMPERATURE h1').innerHTML = data_retrived.main.temp;
  document.querySelector('.type').innerHTML = data_retrived.weather[0].main;
  document.querySelector('.TYPE_OF_MIST h4').innerHTML = data_retrived.main.feels_like+"°C";
  document.querySelector('.HUMIDITY h4').innerHTML = data_retrived.main.pressure+"Pa";
  document.querySelector('.WIND_TYPE h4').innerHTML = data_retrived.wind.speed+"km/hr";


  const latitude = data_retrived.coord.lat;
  const longitude = data_retrived.coord.lon;

  const url2 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_key}`;

  const Response2 = await fetch(url2);

  const aqi_data = await Response2.json();
  console.log(aqi_data);

      const aqi_value = aqi_data.list[0].main.aqi;

    document.querySelector('.MAIN_AQI_MATERIAL h1').innerHTML = aqi_data.list[0].main.aqi;
    document.querySelector('.PMS h4').innerHTML = aqi_data.list[0].components.
pm2_5;
    document.querySelector('.PMS1 h4').innerHTML = aqi_data.list[0].components.pm10;



    if (aqi_value == 1){
      document.querySelector('.AIR_QUALITY h4').innerHTML = " AIR QUALITY IS EXCELLENT (0-20)"
    }
    else if (aqi_value == 2){
      document.querySelector('.AIR_QUALITY h4').innerHTML = " AIR QUALITY IS GOOD(21-50)";
    }
      else if (aqi_value == 3){
      document.querySelector('.AIR_QUALITY').innerHTML = " AIR QUALITY IS FAIR (51-100)";
    }
      else if (aqi_value == 4){
      document.querySelector('.AIR_QUALITY').innerHTML = "AIR QUALITY IS BAD(100-150)";
    }
        else if (aqi_value == 5){
      document.querySelector('.AIR_QUALITY').innerHTML = " AIR QUALITY IS WORST(>150)";
    }
  

  


}
catch(error){
  console.log(" OOPS ERROR OCCURED DURING FETCHING OF DATA ");
}
}
