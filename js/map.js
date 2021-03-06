$(document).ready(function(){
	var city_sel ;
	var me2;	
	$("#table_forcast").hide();
	$("#form").submit(function(event){
	event.preventDefault();
	city_sel = $("#city_name").val();
	if(/^[a-zA-Z-, ]*$/.test(city_sel) == false)
	{
		form.reset();
    	alert('Your search string contains illegal characters.');
	}

	else
	{	form.reset();
		// $("#exp").hide();
		$("#table_forcast").hide("slow");
		$("#cetee, #map, #temp, #weat").fadeIn("slow");
		// $("#overlay").html(temperature + " F");
		// alert("Welcome");
		// console.log(city_sel);
		var fourcast_url = "https://api.foursquare.com/v2/venues/search?near=" + city_sel + "&client_id=NK2F2DN4LL5ZRKHX3QLIUULNCET5OHVX1RYKMDQQ4XY4RFFH&client_secret=00F0HEOA2VAP5XS2OIGKGOTQPM522J1G4M341BY5DQO21CTL&v=20140710&callback=?";
		function display_fourcast(fourecast_response){
			console.log(fourecast_response.meta.code);
			if(fourecast_response.meta.code != 200)
			{
				$("#display_selected").html("City not found");
				$("#overlay").html(" ");
				$("#map, #table_div, .container").hide();
			}
			else
			{
				var result1 = fourecast_response.response.geocode.feature;
				var result = result1.geometry.center;
				var city = result1.displayName;
				var lat = result.lat;
				var lng = result.lng;
				console.log(city);
				console.log(lat);
				console.log(lng);
				$(".container").show();
				$("#display_selected").html("You have selected" + " " + city + 
					"." + " " + "Coordinates are.." + " " + lat +"," + lng);
				var forcast_url = "https://api.forecast.io/forecast/761080e4acfe83e078084db199ffe7c3/" + lat + "," + lng + "?callback=?";
				// var me = [2000, 3.3];
				// var me1 = [2002, 6];
				 $("#table_div").fadeIn("slow");
				me2 = "<table ><tr><th>Date</th><th>Wind Speed (m/s)</th><th>Wind Bearing (°)</th></tr>";
				function display_forcast(forecast_response){
			      var result1_curr = forecast_response.currently;
			      var daily_result = forecast_response.daily.data;
					var dat = new Date(result1_curr.time * 1000);
			      var graph_dat = [];
			      var options = {
			            lines: { show: true, fill:true },
			            points: { show: true },
			            xaxis: { tickDecimals: 0, tickSize: 1 }
			        };
			        var dat_curr1 = new Date(result1_curr.time * 1000);
			        var dat_string1 = dat_curr1.toString();
			        var dat1 = dat_string1.substr(0, 10);
			        var daz =[];
			      console.log(result1_curr);
			      // console.log(daily_result);
			      $("#overlay").html(result1_curr.temperature + " °F");
			      $.each(daily_result, function(i, item){
			        var dat_string = new Date(item.time * 1000);
			        var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
			        // var date = dat.toString();
			        var dat_s = dat_string.toString();
        			var date = dat_s.substr(0, 15);
   			        var day = dat_string.getDay();
			        me2 += "<tr><td>" + date + "</td>" +
			        "<td>" + item.windSpeed + "</td>" +
			        "<td>" + item.windBearing + 
			        "</td></tr>";
	                daz += "<span class='wa'>" + days[day] + "</span>";
		            graph_dat.push([i,item.windSpeed]);
			      });
			      me2 += "</table>";
			      $("#cont_overlay").html(daz);
			      console.log(dat1);
			      $("#table_forcast").html(me2);
					console.log(result1_curr.windSpeed);
					console.log(result1_curr.windBearing);
					$("#tab").html("<table class='table_curr' border='0' cellspacing ='5' cellpadding='5'>" + 
						"<tr><th>Date</th><td>" + dat1 + "</td></tr>" +
						"<tr><th>Wind Speed</th><td>" + result1_curr.windSpeed + 'm/s' + "</td></tr>" +
						"<tr><th>Wind Bearing</th><td>" + result1_curr.windBearing + '°' + "</td></tr>" +
						"</table>")
					$.plot($(".container"), [{ data : graph_dat, label : 'Wind Speed graph'}], options);
				}
				$.getJSON(forcast_url, display_forcast);
  	
			}
		}
			$.getJSON(fourcast_url, display_fourcast);
	}

	});
	$("#get_more").click(function(){
	$("#table_forcast").slideToggle("slow");
		});
});	
     function default_load(){
  $("#cetee, #map, #temp, #weat").fadeIn("slow");
    var city = "Lagos, Nigeria";
    var lat = 6.45306;
    var lng = 3.39583;
    var forcast_url = "https://api.forecast.io/forecast/761080e4acfe83e078084db199ffe7c3/" + lat + "," + lng + "?callback=?";
    console.log(city);
    console.log(lat);
    console.log(lng);
    console.log(forcast_url);
    $(".container").show();
    $("#display_selected").html("You have selected" + " " + city + 
      "." + " " + "Coordinates are.." + " " + lat +"," + lng);
     $("#table_div").fadeIn("slow");
     me2 = "<table ><tr><th>Time</th><th>Wind Speed (m/s)</th><th>Wind Bearing (°)</th></tr>";
    function display_forcast(forecast_response){
      var result_curr = forecast_response.currently;
      var daily_result = forecast_response.daily.data;
		var dat = new Date(result_curr.time * 1000);
      var graph_data = [];
      var daz = [];
      var options = {
            lines: { show: true, fill:true },
            points: { show: true },
            xaxis: { tickDecimals: 0, tickSize: 1 }
        };
        var dat_curr = new Date(result_curr.time * 1000);
        var dat_string = dat_curr.toString();
        var dat = dat_string.substr(0, 10);
      console.log(result_curr);
      // console.log(daily_result);
      $("#overlay").html(result_curr.temperature + " °F");
      $.each(daily_result, function(i, item){
   	   var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        var dat_string = new Date(item.time * 1000);
        var dat_s = dat_string.toString();
        var date = dat_s.substr(0, 15);
        var day = dat_string.getDay();
        me2 += "<tr><td>" + date + "</td>" +
        "<td>" + item.windSpeed + "</td>" +
        "<td>" + item.windBearing + 
        "</td></tr>";
        // daz.push(days[day]);
        daz += "<span class='was'>" + days[day] + "</span>";
           graph_data.push([i,item.windSpeed]);
      });
      me2 += "</table>";
      console.log(daz);
      $("#cont_overlay").html(daz);
		console.log(result_curr.windSpeed);
		console.log(result_curr.windBearing);
		$("#tab").html("<table class='table_curr' border='0' cellspacing ='5' cellpadding='5'>" + 
			"<tr><th>Date</th><td>" + dat + "</td></tr>" +
			"<tr><th>Wind Speed</th><td>" + result_curr.windSpeed + 'm/s' + "</td></tr>" +
			"<tr><th>Wind Bearing</th><td>" + result_curr.windBearing + '°' + "</td></tr>" +
			"</table>")
        $("#table_forcast").html(me2);
      $.plot($(".container"), [{ data : graph_data, label : 'A graph of Wind Speed versus day'}], options);
    }
  $.getJSON(forcast_url, display_forcast);
}
// $(document).ready(function(){
	
// })