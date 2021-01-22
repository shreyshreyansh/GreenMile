#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;

String api_key = "--------"; // Replace this with Write API Key of Your ThingSpeak Channel
int field_no = 1;            // Change this with Your field Number

const int trigP = 2; //D4 Or GPIO-2 of nodemcu
const int echoP = 0; //D3 Or GPIO-0 of nodemcu

long duration;
int distance;

void setup()
{
   pinMode(trigP, OUTPUT); // Sets the trigPin as an Output
   pinMode(echoP, INPUT);  // Sets the echoPin as an Input
   Serial.begin(9600);     // Open serial channel at 9600 baud rate
   wificonnect();
}

void wificonnect()
{
   WiFiMulti.addAP("wiFi username", "wiFi password"); // Change this with your WiFi Credentials
   Serial.println("Conneting");
   while (WiFiMulti.run() != WL_CONNECTED)
   {
      Serial.print(".");
      digitalWrite(D0, LOW);
      delay(100);
      digitalWrite(D0, HIGH);
      delay(100);
   }
   Serial.print("Connected to HOTSPOT..\n"); // This line will execute if your device is connected to Access Pass
}

void loop()
{
   digitalWrite(trigP, LOW); // Makes trigPin low
   delayMicroseconds(2);     // 2 micro second delay

   digitalWrite(trigP, HIGH); // tigPin high
   delayMicroseconds(10);     // trigPin high for 10 micro seconds
   digitalWrite(trigP, LOW);  // trigPin low

   duration = pulseIn(echoP, HIGH); //Read echo pin, time in microseconds
   distance = duration * 0.034 / 2; //Calculating actual/real distance

   //Assuming height of the dustbin is 1m or 100cm.
   distance = 100 - distance;
   GETsend(distance);
   delay(3000); //Pause for 3 seconds and start measuring distance again
}

void GETsend(int data)
{
   HTTPClient http; //http is the object of class HTTPClient this class defines the method to create and send HTTP requests
   String url = "http://api.thingspeak.com/update?api_key=";
   url += api_key;
   url += "&field";
   url += field_no;
   url += "=";      // Creating HTTP Query/GET Method
   url += data;     // passing the parameter to string, this value will reach cloud at field1
   http.begin(url); // initiate HTTP Request to establish connection

   Serial.print("HTTP REQUEST SENT, Waiting for response\n");

   // start connection and send HTTP header
   int httpCode = http.GET(); // get method, returns a http code, -ve if access denied
   // httpCode will be negative on error
   if (httpCode > 0)
   {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("Sensor data uploaded sucessfully");
   }
   else
   {
      Serial.printf("Failed to connect to server");
   }
   http.end();
   delay(16000);
}