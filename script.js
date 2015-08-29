$(document).ready(function(){
  // From Open Weather only for the icon
  $.getJSON("http://www.telize.com/geoip?callback=?",
		function(data) {
			$("#region").text(data.city+", "+data.country);
      fromOpenWeather(data.latitude, data.longitude);
      fromSimpleWeather(data.latitude+","+data.longitude, "f");
        //Switch Button
      $("[name='switch']").bootstrapSwitch();
      $('input[name="switch"]').on('switchChange.bootstrapSwitch',         function(event, state) {
          if(state === false){
            fromSimpleWeather(data.latitude+","+data.longitude, "c");
          }
          if(state === true){
            fromSimpleWeather(data.latitude+","+data.longitude, "f");
          }
    });
		}
	);
  function fromOpenWeather(lat, lng){
    var link = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&units=metric";
    $.getJSON(link, function(data){
      // Icon
      $('#image').attr("src"," http://openweathermap.org/img/w/"+data.weather[0].icon+".png" );
      
      // Background
      if((data.main.temp)>32){
       $('.jumbotron').css('background-image', 'url(http://bit.ly/1KSc2Qo)');
      }else if((data.main.temp)>20 || (weather.main.temp)<32){
        $('.jumbotron').css('background-image', 'url(http://bit.ly/1NEiT65)');
      }else if((data.main.temp)>0 || (weather.main.temp)<20){
        $('jumbotron').css('background-image', 'url(http://bit.ly/1WWGkdG)');
      }else if((data.main.temp)>-30 || (weather.main.temp)<0){
        $('jubotron').css('background-image', 'url(http://bit.ly/1JqkiJt)');
      }
    });
  }
  
  // From Simple Weather
  function fromSimpleWeather(location, unit){
    $.simpleWeather({
      location: location,
      woeid: '',
      unit: unit,
      success: function(weather) {
        $("#temp").text(weather.temp+'°'+weather.units.temp);
        $("#description").text(weather.currently);
        $("#wind").text(weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed);
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    });
  }
});
