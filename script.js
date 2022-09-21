// async function foo(){
//       try{
//        var container=document.createElement("div");
//        container.setAttribute("class","containerFluid");
//        container.style.backgroundColor="lightgray";
//        var row=document.createElement("div");
//        row.classList.add("row","m-3");
//        container.append(row);
//       //  const element = document.getElementById("myBtn"); 
//       // element.addEventListener("click", weatherData);
       
//        var res=await fetch("https://restcountries.com/v2/all");
//        var res1=await res.json();
//        console.log(res1);
//        for(var i=0;i<res1.length;i++){
//          row.innerHTML+=`
//          <div class="col-md-3">
//                 <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
//                        <div class="card-header" style="text-align:center;">${res1[i].name}<br><br>
//                             <img src="${res1[i].flag}" class="card-img-top" style="height:80px; width:180px">
//                              <div class="card-body">
//                                  <h6 class="card-title">Capital:${res1[i].capital}</h6>
//                                <h6 class="card-title">Region:${res1[i].region}</h6>
//                                <h6 class="card-title">CountryCode:${res1[i].alpha3Code}</h6>
//                                <h6 class="card-title">Latlng:${res1[i].latlng}</h6>
                            
//                                <button class="btn btn-primary" type="button" onclick="fun()">Click for Weather</button>
                              

//                               </div>
                               
                               
//                         </div>

//                   </div>
                  
//             </div>`;
          
//             }
//             document.body.append(container);

//       }
//     catch(error){
//         console.log(error);
//       }
// }
// foo();     



// var container=document.createElement("div");
// container.setAttribute("class","container");

// var input=document.createElement("input");
// input.setAttribute("type","text");
// input.setAttribute("id","myText");
// input.setAttribute("placeholder","Enter Cityname");

// var button=document.createElement("button");
// button.setAttribute("type","button");
// button.classList.add("btn","btn-primary");
// button.innerHTML="Submit";


// button.addEventListener("click",fun);
// document.body.append(input,button);
// async function fun(){
//     let cityname=document.getElementById("myText").value;
//     cityname=cityname==""?"chennai":cityname
    
//     let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6e098448582ec5b12f2f57c057d12e92`;
//     // https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}
//     // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6e098448582ec5b12f2f57c057d12e92
//     let result=await fetch(api);
//     let result1=await result.json();
//     console.log(result1);
    
//     var weatherDatas = document.getElementById('weatherDatas');
//     weatherDatas.innerHTML=` <div class="row g-0">
//          <div class="col-md-4">
//              <img src="https://play-lh.googleusercontent.com/pCQw51XRP4UPr-FCYDjvNnEpFa0HDGJjjLDldN3rmw4KkwhqPu0PZXE8EopmAxzH9mQ=w240-h480-rw" 
//                     class="img-fluid rounded-start">
//         </div>
//         <div class="col-md-8">
//             <div class="card-body">
//                     <h4 class="card-title">Weather Data:${cityname}</h4>
//                     <p class="card-text"><small class="text-muted">Temperature:${result1.main.temp}</small></p>
//                     <p class="card-text"><small class="text-muted">Weatherid:${result1.weather[0].id}</small></p>
//                     <p class="card-text"><small class="text-muted">Humidity:${result1.main.humidity}</small></p>
//                  </div>
                
//             </div>

//          </div>`;

// }
// fun();

var boundary = document.createElement('div');
boundary.setAttribute("class","container");

var row = document.createElement('div');
row.setAttribute('class', 'row')
row.setAttribute("id","card")

document.body.append(boundary);
boundary.append(row);


async function getData() {
    try {
        var rest_countries = await fetch("https://restcountries.com/v3.1/all");
        var jsondata = await rest_countries.json();
           console.log(jsondata);

        jsondata.forEach((element, index) => {
            var card = document.createElement('div');
            card.setAttribute('class','card row col-lg-4 col-md-6 col-sm-12');
            card.setAttribute("id","cards")


            var header = document.createElement('h4')
            header.setAttribute('class', 'card-header text-center  text-white')
            header.innerHTML = element.name.common;

            var cardbody = document.createElement('div');
            cardbody.setAttribute('class', 'card-body text-center  text-white');
            
            var img = document.createElement('img');
            img.setAttribute('class','card-img-top');
            img.src = element.flags.png;
            

            var capital = document.createElement('h6');
            capital.setAttribute('class', 'card-text text-center');
            capital.innerHTML = 'Capital : ' + element.capital;

            var region = document.createElement('h6');
            region.setAttribute('class', 'card-text text-center');
            region.innerHTML = 'Region : ' + element.region;

            var code = document.createElement('h6');
            code.setAttribute('class', 'card-text text-center');
            code.innerHTML = 'Country-code : ' + element.cca3;

            var climate = document.createElement('h6');
            climate.setAttribute('class', 'card-text text-center mt-3');

            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-info');
            btn.innerHTML = 'Click for Weather';
            btn.id = "btn-" + index;
            btn.onclick = async function() {
                try {
                    var data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${element.latlng[0]}&lon=${element.latlng[1]}&appid=b0be8f00887720a1be242ae7651d582d`);
                   
                    var weatherdata = await data.json();
                    console.log(weatherdata);
                    console.log(element.latlng + ' : ' + weatherdata.coord.lon, weatherdata.coord.lat)
                    climate.innerHTML = (weatherdata.main.temp - 273.15).toFixed(2) + "&#176; C , " + weatherdata['weather'][0].description
                } catch (err) {
                    console.log(err);
                }

            }

            cardbody.append(img, capital, region, code, btn, climate)
            card.append(header, cardbody);
            row.append(card);
        });
    } catch (err) {
        console.log(err);
    }

}

getData()