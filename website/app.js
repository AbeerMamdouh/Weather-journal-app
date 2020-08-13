/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'b041ce13ca810de1038936feb80a8714';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    const fellings =  document.getElementById('feelings').value;

    getTemp(baseURL, zipCode, apiKey )

  .then(function(data){
    console.log(data);
    postData('/add', {temperature: data.temp, date: newDate, userResponse: fellings} );
  })

  .then(
    updateUI()
  )
}

const getTemp = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.userResponse;
  
    }catch(error){
      console.log("error", error);
    }
  }

