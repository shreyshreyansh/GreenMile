/*
Problem Statement: Upload random data to your channel on ThingSpeak
Developed by: Rahul Shrivastava
*/

#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;

String api_key = "WMZMG50CI134RA78";// Replace this with Write API Key of Your ThingSpeak Channel
int field_no = 0;// Change this with Your field Number

void setup() {
    Serial.begin(115200);
    Serial.flush();
    pinMode(D0, OUTPUT); 
    wificonnect();         
}

void loop() {
        int random_data = random(0,99);
  field_no = ((field_no)%4) + 1;
        GETsend(random_data);
}

void wificonnect()
  {
    WiFiMulti.addAP("iPhone11", "1jj1jj1jj");// Change this with your WiFi Credentials 
    Serial.println("Conneting");
    while(WiFiMulti.run()!=WL_CONNECTED)
    {
      Serial.print(".");
      digitalWrite(D0, LOW);
      delay(100);
      digitalWrite(D0, HIGH);
      delay(100);
    }
     Serial.print("Connected to HOTSPOT..\n");// This line will execute if your device is connected to Access Pass
  }

void GETsend(int data)
{
        HTTPClient http; //http is the object of class HTTPClient this class defines the method to create and send HTTP requests            
        String url =  "http://api.thingspeak.com/update?api_key=";
               url += api_key;
               url += "&field";
               url += field_no;
               url += "=";// Creating HTTP Query/GET Method
               url += data;// passing the parameter to string, this value will reach cloud at field1
        http.begin(url);// initiate HTTP Request to establish connection  

        Serial.print("HTTP REQUEST SENT, Waiting for response\n");
        
        // start connection and send HTTP header
        int httpCode = http.GET();// get method, returns a http code, -ve if access denied
        // httpCode will be negative on error      
        if(httpCode > 0) {
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
