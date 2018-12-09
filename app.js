


$(document).ready(function() {
  generarMapa();
  var resumen = $('#resumen');
  var sensacion = $('#sensacion');
  var probabilidad = $('#probabilidad');
  var humedad = $('#humedad');
  var imagen = $('.img-responsive');
  var escondido = $('#escondido');

  //Variables para descomponer la url y poder hacerla dinámica
  var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
  var key = '73820199c77c14e44d59584d7b721d77';
  //Variable con varios valores= objeto literal
  var coords = {
    vdm: '-33.024503,-71.5518119',
    scl: '-33.4377968,-70.6504451',
    ccp: '-36.8270169, -73.0503189',
    pta: '-53.1625446, -70.907785',
  }
  var queryParams = ['?exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto']

  var image = {
    'clear-day': 'https://image.flaticon.com/icons/svg/365/365237.svg',
    'rain': 'https://image.flaticon.com/icons/svg/365/365226.svg',
    'partly-cloudy-day': 'https://image.flaticon.com/icons/svg/365/365229.svg',
  }

  var mymap;



  //Cuando cambie de valor el select ejecutará una función

  $('#select').on('change', function() {

    //La función hará un Request ajax con la url dinámica que tomara el valor del elemento seleccionado para devolver sus coordenadas y filtraremos la información que llega
    $.ajax({
      url: url + key + '/' + coords[$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
      method: 'GET'

      //después de hacer el llamado se ejecutará el método then que recibirá una función anónima con argumento data, que será el objeto que traerá la api de vuelta, y lo mostraremos por console log
    }).then(function(data) {
      console.log(data);
      //mostrar en h2 temperatura y resumen, en la tabla los datos con sus signos e imagen según icon
      resumen.text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
      sensacion.text(parseInt(data.currently.apparentTemperature) + '°');
      probabilidad.text(data.currently.precipProbability * 100 + '%');
      humedad.text(data.currently.humidity * 100 + '%');
      imagen.attr('src', image[data.currently.icon]);
      escondido.removeAttr('hidden');
    });

  changeMarkerPosition(coords[$(this).val()]);
  });

  function generarMapa() {

    var mymap = L.map('map').setView([-33.4377968,-70.6504451], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoia2ltbG8iLCJhIjoiY2pwMWN2b3M2M2ViZjNza3dha2RpcmZpOCJ9.YJuZeXwiEUfgTVXD2apWRg'

    }).addTo(mymap);
      var marker = L.marker([-33.4377968,-70.6504451]).addTo(mymap);


  }
  function changeMarkerPosition(coords){
    var latitud = coords.split(",")[0];
    var longitud = coords.split(",")[1];
    mymap.panTo(new L.LatLng(latitud, longitud));

		L.marker([latitud,longitud]).addTo(mymap);
  }
    $('#select').on('change'),function(){
       $(this).val()

       var a = $(this).val();
       console.log(a);


    }


});
