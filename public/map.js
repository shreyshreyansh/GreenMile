function makeRequest(url, callback) {
  var request;
  if (window.XMLHttpRequest) {
  request = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari
  } else {
  request = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
  }
  request.onreadystatechange = function() {
  if (request.readyState == 4 && request.status == 200) {
  callback(request);
  }
  }
  request.open("GET", url, true);
  request.send();
}
function initMap() {
  
    let x = 40.52, y = 34.34;
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
        
    function success(pos) {
      var crd = pos.coords;
      x = pos.coords.latitude, y = pos.coords.longitude;
      console.log(x);
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
  
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer(
        {
          suppressMarkers: true
        }
      );
      const map = new google.maps.Map(document.getElementById("map"), {
        mapTypeControl: false,
        zoom: 17,
        streetViewControl: false,
        center: { lat: x, lng: y }
      });
  
      makeRequest('/data', function(data) {
        console.log(data.response);
        // var data = JSON.parse(data.responseText);
        
        // for (var i = 0; i < data.length; i++) {
        // displayLocation(data[i]);
        // }
        });
      const contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        "<iframe width='450' height='260' style='border: 1px solid #cccccc;' src='https://thingspeak.com/channels/1264608/charts/1?api_key=FLM4CO7L9F6SAGRI&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line'></iframe>"+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
      
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      
      const marker = new google.maps.Marker({
        position: { lat: 43.041537, lng: -76.119375  },
        map,
        icon: "imgSrc/paper-bucket.png",
        title: "Uluru (Ayers Rock)",
      });
      const marker1 = new google.maps.Marker({
        position: { lat: x, lng: y  },
        map,
        icon: "imgSrc/paper-bucket.png",
        title: "Uluru (Ayers Rock)",
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
  
      directionsRenderer.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    }
        
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);     
  
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  
    var first = new google.maps.LatLng(43.041537, -76.119375);
    var second = new google.maps.LatLng( 43.037556, -76.119014);
    const waypts = [{location: first, stopover: true},{location: second, stopover: true}];
          
          
      // const checkboxArray = document.getElementById("waypoints");
      // console.log(document.getElementById("start").value);
      // for (let i = 0; i < checkboxArray.length; i++) {
      //   if (checkboxArray.options[i].selected) {
      //     waypts.push({
      //       location: checkboxArray[i].value,
      //       stopover: true,
      //     });
      //   }
      // }
    directionsService.route(
      {
        origin: {lat : 43.038368, lng: -76.123257 },
        destination: {lat : 43.039082, lng: -76.115307 },
        optimizeWaypoints: true,
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          console.log(response);
        } else {
            window.alert("Directions request failed due to " + status);
        }
      }
      );
    }
  