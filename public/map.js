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
      
      const directionsRenderer = new google.maps.DirectionsRenderer(
        {
          suppressMarkers: true
        }
      );
      var noPoi = [
        {
            featureType: "poi",
            stylers: [
              { visibility: "off" }
            ]   
          }
        ];
      const map = new google.maps.Map(document.getElementById("map"), {
        mapTypeControl: false,
        zoom: 17,
        streetViewControl: false,
        styles: noPoi,
        center: { lat: x, lng: y }
      });
  
      makeRequest('/data', function(data) {
        var data = JSON.parse(data.responseText); 
        if(data){
        for (var j = 0; j < data.length; j++) {
          var url = "https://api.thingspeak.com/channels/"+data[j].channelID+"/fields/1/last.json";
          console.log(data[j]._dustbinID);
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", url, false);
          xhttp.send();
          var data1 = JSON.parse(xhttp.responseText);
          var url1 = "/change/"+data[j].channelID+"/"+data1.field1;
          xhttp = new XMLHttpRequest();
          xhttp.open("GET", url1, false);
          xhttp.send();
        }
        }
        for (var i = 0; i < data.length; i++) {
          var contentString = '<div id="container">' +
          '<div id="upperContainer">' +
          '<p class="dustbinInfo">Dustbin Id : '+ data[i]._dustbinID + '</p>'+
          '<p class="dustbinInfo">Last Pickup : '+ data[i].lastPickup.split("T")[0] + '</p>'+
          '<p class="dustbinInfo">Percentage Filled : '+ data[i].percentFilled + '%</p>'+
          '<p class="dustbinInfo">Driver Name : '+ data[i].driverName + '</p>'+
          '<p class="dustbinInfo">Driver PhoneNo : '+ data[i].driverPhoneNo + '</p>'+
          '<p class="dustbinInfo">Driver Municipal Head : '+ data[i].driverMunipalHeadName + '</p>'+
          "</div>" +
          '<div id="lowerContainer">' +
          '<iframe width="435" height="230" style="border: 0; margin-left:14%;" src=' + data[i].graphLink + '></iframe>'+
          "</div>" +
          "</div>" ;
        
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        
        if(data[i].percentFilled<=30){
          const marker = new google.maps.Marker({
            position: { lat: data[i].lat, lng: data[i].lng},
            map,
            icon: "imgSrc/green-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        }else if(data[i].percentFilled>30 && data[i].percentFilled<=60){
          const marker = new google.maps.Marker({
            position: { lat: data[i].lat, lng: data[i].lng},
            map,
            icon: "imgSrc/yellow-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        }else{
          const marker = new google.maps.Marker({
            position: { lat: data[i].lat, lng: data[i].lng},
            map,
            icon: "imgSrc/red-trash.png",
          });
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        }
        
      }
      });
      directionsRenderer.setMap(map);
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);     
}
  