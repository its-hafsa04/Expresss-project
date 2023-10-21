const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const todayDate = document.getElementById('today-date');
const datahide = document.querySelector('.middle-layer');

const getinfo = async(event) =>{
    event.preventDefault();
    let cityval = cityName.value;
if(cityval.trim() === ""){
city_name.innerText = 'Plz write the name to search';
datahide.classList.add('data_hide');

}else{
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=f6fd5222d8826e479e879b59b12abaeb`;
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];
        console.log(data);

        city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
        temp_real_val.innerText = arrData[0].main.temp;
        
       const tempMode  = arrData[0].weather[0].main;

//weather condition
if(tempMode == 'Clear'){
    temp_status.innerHTML =
    "<i class='fas fa-sun' style='color: yellow'></i>"
}else if(tempMode == 'Clouds'){
    temp_status.innerHTML =
    "<i class='fas fa-cloud' style='color: gray'></i>"
}else if(tempMode == 'Rain'){
    temp_status.innerHTML =
    "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
}else{
    temp_status.innerHTML =
    "<i class='fas fa-sun' style='color: yellow'></i>"
}

// Set day and date
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
day.innerText = today.toLocaleDateString(undefined, options);
todayDate.innerText = today.toLocaleDateString();

datahide.classList.remove('data_hide');

}catch{
    city_name.innerText = 'City not found';
    datahide.classList.add('data_hide');

}
};

};

submitBtn.addEventListener('click',getinfo);
