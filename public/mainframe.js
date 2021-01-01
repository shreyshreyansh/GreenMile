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

    makeRequest('/activeUserData', function(data) {
      var data = JSON.parse(data.responseText);
      console.log(data);
      document.getElementById("loginName").prepend(data.name);
      document.getElementById("loginImg").style.backgroundImage = "url(" + data.driverPhotoLink +")";
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeControl: false,
      zoom: 17,
      streetViewControl: false,
      center: { lat: x, lng: y }
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
      "<iframe width='450' height='260' style='border: 1px solid #cccccc;' src='https://thingspeak.com/channels/320695/charts/1?bgcolor=%23ffffff&color=%23F62020&dynamic=true&results=50&type=line&update=15'></iframe>"+
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

  var second = new google.maps.LatLng(43.041537, -76.119375);
  var first = new google.maps.LatLng( 43.037556, -76.119014);
  const waypts = [{location: "winnipeg, mb", stopover: true},{location: "fargo, nd", stopover: true}];
        
        
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
      origin: "Halifax, NS",
      destination: "Vancouver, BC",
      optimizeWaypoints: true,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        console.log(response);
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");
        for (let i = 0; i < route.legs[0].steps.length; i++) {
          summaryPanel.innerHTML +=
          "<div class='direction'>"+
          "<div class='direction-left col-xs-8'>"+ 
          route.legs[0].steps[i].instructions +
          "</div>"+
          "<div class='direction-right col-xs-4'>"+
          route.legs[0].steps[i].distance.text+"<br/>"+
          route.legs[0].steps[i].duration.text+
          "</div>"+
          "</div>";
        }
      } else {
          window.alert("Directions request failed due to " + status);
      }
    }
    );
  }



  
