function setSessionItem(name, value) {
  var mySession;
  try {
      mySession = JSON.parse(localStorage.getItem('mySession'));
  } catch (e) {
      console.log(e);
      mySession = {};
  }

  mySession[name] = value;

  mySession = JSON.stringify(mySession);

  localStorage.setItem('mySession', mySession);
}

function getSessionItem(name) {
  var mySession = localStroage.getItem('mySession');
  if (mySession) {
      try {
          mySession = JSON.stringify(mySession);
          return mySession[name];
      } catch (e) {
          console.log(e);
      }
  }
}

function restoreSession(data) {
  for (var x in data) {
      //use saved data to set values as needed
      console.log(x, data[x]);
  }
}



window.addEventListener('load', function(e) {
  var mySession = localStorage.getItem('mySession');
  if (mySession) {
      try {
          mySession = JSON.parse(localStorage.getItem('mySession'));
      } catch (e) {
          console.log(e);
          mySession = {};
      }
      restoreSession(mySession);
  } else {
      localStorage.setItem('mySession', '{}');
  }

  setSessionItem('foo', Date.now()); //should change each time

  if (!mySession.bar) {
      setSessionItem('bar', Date.now()); //should not change on refresh
  }
}, false);





//For loading animation
document.onreadystatechange = function() { 
  if (document.readyState !== "complete") { 
      document.querySelector( 
        "body").style.visibility = "hidden"; 
      document.querySelector( 
        "#loader").style.visibility = "visible"; 
  } else { 
      document.querySelector( 
        "#loader").style.display = "none"; 
      document.querySelector( 
        "body").style.visibility = "visible"; 
  } 
};

//making an XML request to the URL to get the JSON posted by index.js 
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
  let x = 23.6101808, y = 85.2799354;
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

    //getting the JSON by index.js
    makeRequest('/activeUserData', function(data) {
      var data = JSON.parse(data.responseText);
      console.log(data);
      for (var j = 0; j < data.dustbin.length; j++) {
        var url = "https://api.thingspeak.com/channels/"+data.dustbin[j].channelID+"/fields/1/last.json";
        // console.log(data[j]._dustbinID);
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();
        var data1 = JSON.parse(xhttp.responseText);
        var url1 = "/change/"+data.dustbin[j].channelID+"/"+data1.field1;
        console.log(url1);
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", url1, false);
        xhttp.send();
      }
      document.getElementById("loginName").prepend(data.name);
      document.getElementById("loginImg").style.backgroundImage = "url(" + data.driverPhotoLink +")";
      var noPoi = [
        {
            featureType: "poi",
            stylers: [
              { visibility: "off" }
            ]   
          }
        ];
      //intializing the map with specified settings 
      const map = new google.maps.Map(document.getElementById("map"), {
        mapTypeControl: false,
        zoom: 17,
        streetViewControl: false,
        styles: noPoi,
        center: { lat: x, lng: y }
      });
      console.log(x);
      console.log(y);
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer(
        {
          suppressMarkers: true
        }
      );
      const start = new google.maps.Marker({
        position: { lat: x, lng: y },
        map,
        icon: "imgSrc/start.png",
      });
      const end = new google.maps.Marker({
        position: { lat: 23.662902, lng: 85.314584 },
        map,
        icon: "imgSrc/flag.png",
      });
      //listing all the dustbin data from the JSON recieved through XML
      for (var i = 0; i < data.dustbin.length; i++) {
        var contentString = '<div id="container">' +
        '<div id="upperContainer">' +
        '<p class="dustbinInfo">Dustbin Id : '+ data.dustbin[i]._dustbinID + '</p>'+
        '<p class="dustbinInfo">Percentage Filled : '+ data.dustbin[i].percentFilled + '%</p>'+
        "</div>" +
        '<input type="hidden" name="dustbinID" value=' + data.dustbin[i]._dustbinID + '>' +
        '<button onClick="window.location.reload();" type="submit">PICKUP</button>' +
        "</div>" ;
      
        //creating infowindow for the google maps
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        
        //if less than 30% green, if between 30% to 60% yellow, if more than 60% red
        if(data.dustbin[i].percentFilled<=30){
          //adding marker and infowindow
          const marker = new google.maps.Marker({
            position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
            map,
            icon: "imgSrc/green-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        }else if((data.dustbin[i].percentFilled>30 && data.dustbin[i].percentFilled<=60)){
          //adding marker and infowindow
          const marker = new google.maps.Marker({
            position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
            map,
            icon: "imgSrc/yellow-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        }else{
          //adding marker and infowindow
          const marker = new google.maps.Marker({
            position: { lat: data.dustbin[i].lat, lng: data.dustbin[i].lng},
            map,
            icon: "imgSrc/red-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
          //add the dustbin to the waypoint of the driver journey as it is more than
          //60%.
          waypts.push({
            location: new google.maps.LatLng(data.dustbin[i].lat, data.dustbin[i].lng),
            stopover: true,
          });
        }
      
    }
    //render the map with specific instruction
    directionsRenderer.setMap(map);

    //Clicking the start button will start the journey
    document.getElementById('jStart').addEventListener('click', function(){ 
      document.getElementById('jStart').innerHTML = '<i class="fas fa-location-arrow"></i><span class="text">Calculating</span><span class="glyphicon glyphicon-refresh spinning"></span>';
      document.getElementById("directions-panel").innerHTML = "";
      //this function calculate the dirctions with the waypoints.
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    }); 
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //finds current position of the user and make it the map center
  navigator.geolocation.getCurrentPosition(success, error, options);     
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {            
  directionsService.route({
      origin: { lat: 23.6101808, lng: 85.2799354},
      destination: { lat: 23.662902, lng: 85.314584},
      optimizeWaypoints: true,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING,
    },(response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        // console.log(response);
        $('#jStart').animate({marginTop: "25px"});
        const route = response.routes[0];
        //display instructions about the journey.
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
        document.getElementById('jStart').innerHTML = '<i class="fas fa-location-arrow"></i><span class="text">Re-Calculate</span>';
      } else {
          window.alert("Directions request failed due to " + status);
      }
    }
    );
  }



  
