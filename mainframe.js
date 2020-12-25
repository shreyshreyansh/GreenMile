

















// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {
    // var options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0
    //   };
      
    //   function success(pos) {
    //     var crd = pos.coords;
      
    //     console.log('Your current position is:');
    //     console.log(`Latitude : ${crd.latitude}`);
    //     console.log(`Longitude: ${crd.longitude}`);
    //     console.log(`More or less ${crd.accuracy} meters.`);
    //   }
      
    //   function error(err) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    //   }
    //   navigator.geolocation.getCurrentPosition(success, error, options);
    
            




    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 41.85, lng: -87.65 },
  });
  const uluru = { lat: 23.4088259, lng: 85.31267419999999  };
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
                position: { lat: 23.402157, lng: 85.314976  },
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

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {

    var first = new google.maps.LatLng(23.402157, 85.314976);
    var second = new google.maps.LatLng(23.418845, 85.314570);
    const waypts = [{location: first, stopover: false},
        {location: second, stopover: false}];
        
        
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
        origin: new google.maps.LatLng(23.422157, 85.314976),
        destination: new google.maps.LatLng(23.384191, 85.315600),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          console.log(response);
          const route = response.routes[0];
          const summaryPanel = document.getElementById("directions-panel");
          summaryPanel.innerHTML = "";
  
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
          }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }



  
