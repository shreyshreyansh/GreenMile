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


var waypts = [];
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
      
      const map = new google.maps.Map(document.getElementById("map"), {
        mapTypeControl: false,
        zoom: 17,
        streetViewControl: false,
        center: { lat: x, lng: y }
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      for (var i = 0; i < data.dustbin.length; i++) {
        var contentString = '<div id="container">' +
        '<div id="upperContainer">' +
        '<p class="dustbinInfo">Dustbin Id : '+ data.dustbin[i].dustbinID + '</p>'+
        '<p class="dustbinInfo">Last Pickup : '+ data.dustbin[i].lastPickup.split("T")[0] + '</p>'+
        '<p class="dustbinInfo">Percentage Filled : '+ data.dustbin[i].percentFill + '%</p>'+
        "</div>" +
        // '<div id="lowerContainer">' +
        // '<iframe width="435" height="230" style="border: 0; margin-left:14%;" src=' + data[i].graphLink + '></iframe>'+
        // "</div>" +
        "</div>" ;
      
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      
      if(data.dustbin[i].percentFill<=30){
        const marker = new google.maps.Marker({
          position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
          map,
          icon: "imgSrc/green-trash.png",
        });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }else if(data.dustbin[i].percentFill>30 && data.dustbin[i].percentFill<=60){
        const marker = new google.maps.Marker({
          position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
          map,
          icon: "imgSrc/yellow-trash.png",
        });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
        
      }else{
        const marker = new google.maps.Marker({
          position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
          map,
          icon: "imgSrc/red-trash.png",
        });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
        waypts.push({
          location: new google.maps.LatLng(data.dustbin[i].lat, data.dustbin[i].lng),
          stopover: true,
        });
        console.log(waypts);
      }
      
    }
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    
  }
      
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);     

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {        
        
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



  
