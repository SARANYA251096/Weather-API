var boundary = document.createElement('div');
boundary.setAttribute("class","container");

var row = document.createElement('div');
row.setAttribute('class', 'row')
row.setAttribute("id","card")

document.body.append(boundary);
boundary.append(row);


async function getData() {
    try {
        var rest_countries = await fetch("https://restcountries.com/v2/all");
        var jsondata = await rest_countries.json();
           console.log(jsondata);

        jsondata.forEach((element, index) => {
            var card = document.createElement('div');
            card.setAttribute('class','card row col-lg-4 col-md-6 col-sm-12');
            card.setAttribute("id","cards")


            var header = document.createElement('h4')
            header.setAttribute('class', 'card-header text-center  text-white')
            header.innerHTML = element.name;

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
            code.innerHTML = 'Country-code : ' + element.alpha3Code;

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
