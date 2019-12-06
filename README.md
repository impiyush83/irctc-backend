# IRCTC Service
A web-server (with HTTP APIs) that manages irctc travel paths.

-----
# Steps to run:
1. Install Node.js version ```8.9.1```
2. Install MongoDB Community Server edition version ```3.3.5```.
3. On command line type ```mongo``` and hit enter. (Will run Mongo on its default port ```27017```)
4. Go to root directory of *IRCTC* project.
5. On command line type ```npm install``` and hit enter.
6. On command line type ```npm start``` and hit enter.
- Yay! 🎉 our server is up and running on default port ```3000```.
- Go through below docs, to understand the ```Entities``` and supported ```API```'s.
- Optional: You can also run test cases by ```npm test```.
-----
# Entity
- Logically there are 3 entities: `City, CityConnection & User`. If we were to design our systems in SQL DB, then there would have been 3 tables for each, having 1:n relationship between (City to CityConnections) respectively.
- But as we wanted to store data in NOSQL datastore, we have clubbed these entities into single two models as shown below. 
- Also among all the NOSQL DB's we have chosen MongoDB document data store, because it provides atomicity at the document level & is strongly consistent (providing CP of the CAP theorem).
    ```
    CitySchema - Contains city details and its neigbouring cities

    {
        "_id":  Mongo ObjectId, 
        "cityId": String,
        "cityName": String,
        "neighbours": [String]
    }
    
    
    _id        : Uniquely identifies the city. No other document can have the same value. Thus integrity is maintained across all the cities.        
    cityId     : This field is indexed and unique. Identifies cities.
    cityName   : This field is indexed and unique. Identifies cities.
    neighbours : Array of strings.
    ```
    ```
    CityConnectionSchema - Contains city connections with other cities.

    {
        "_id":  Mongo ObjectId, 
        "source": String,
        "destination": String
        "cost": Number minimum value of 1 
    }
    
    
    _id        : Uniquely identifies the city. No other document can have the same value. Thus integrity is maintained across all the cities.        
    source     : This field is indexed . Identifies cities.
    destination   : This field is indexed  Identifies cities.
    ```

- As per our use case the queries which would be much more frequent are: Get city Neighbours, get CityConnection . So as a result we are indexing **cityName**, **source**, **destination**. By default **_id** is indexed by MongoDB.
- Why **id** field is **String** data type instead of **Number** data type for **cityId**? --> Because in JS (as most of our web clients would be in JS) the Number cannot go beyond *9007199254740991*. So we don't want to limit the number of records in our table by mere **JS language's data type limitation**! That's why all id's are choosen to be of *String* data type.

-----

# API

## API Documentation link: 
https://documenter.getpostman.com/view/4946631/SWE3dzjB?version=latest#bce6c6ee-cbbf-46c0-87a6-b3e3593c900b

## Admin Authorized API's: 

### GET Unconnected cities

- API: ```localhost:3000/independantcities```
- HTTP method: GET
- Gets the locations which are isolated from other cities and does not have any direct connection to other city.
    ```
    Example using cURL

    curl -X  --request GET "http://127.0.0.1:3000/independantcities" \
  --header "role: admin"
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "unconnectedCities": [
            {
                "cityName": "Guwahati"
            }
        ]
    }   
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### GET Cities with Maximum Crossovers

- API: ```localhost:3000/globalcities```
- HTTP method: GET
- Gets the cities with maximum crossovers.
    ```
    Example using cURL
    
    curl -X --request GET "http://127.0.0.1:3000/globalcities" \
    -H "role: admin"
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "mostCrossoverCities": [
            {
                "cityName": "Kashmir"
            }
        ]
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### POST Add city

- API: ```localhost:3000/city```
- HTTP method: POST
- Add a new city. 
    ```
    Example using cURL
    
    curl -X  --request POST \
  http://localhost:3000/city \
    -H 'role: admin' \
    -d '{
	"cityName": "Piyush1"
    }'

    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": "Success"
    }   
    ```
    ```
    Failure response 
    Status code: 409
    
    When admin tries to add a city, but given city already exists.
    {
        "code": 409,
        "success": false,
        "message": "City already exists"
    }
    ```
    ```
    Failure response 
    Status code: 400
    
    When admin tries to add a city, but the body is incorrect.
    {
        "message" : "the value of cityName is not allowed to be undefined"
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### DELETE city

- API: ```localhost:3000/city```
- HTTP method: DELETE
- Deletes the city and all its connections.
    ```
    Example using cURL
    
    curl -X --request DELETE \
      http://localhost:3000/city/Thane \
      -H 'role: admin'
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": Success
    }
    ```
    ```
    Failure response 
    Status code: 400
    
    When admin tries to sell a stock, but given quantity exceeds than what he has.
    {
        "code": 5001,
        "success": false,
        "message": "Insufficient quantity of stocks available., Currently available <quantity> stocks of <stock name>"
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### POST City Connection

- API: ```localhost:3000/cityconnection```
- HTTP method: POST
- Adds the  bidirectional city connection.
    ```
    Example using cURL
    
    curl -X --request POST \
      http://localhost:3000/cityconnection \
      -H 'role: admin'
      -d '{
	    "point1": "City1",
        "point2": "City2"
    }'
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": Success
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### DELETE City Connection

- API: ```localhost:3000/cityconnection```
- HTTP method: DELETE
- Deletes the  bidirectional city connection.
    ```
    Example using cURL
    
    curl -X --request DELETE \
      http://localhost:3000/cityconnection \
      -H 'role: admin'
      -d '{
	    "point1": "City1",
        "point2": "City2"
    }'
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": Success
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

### PUT City Connection

- API: ```localhost:3000/cityconnection```
- HTTP method: PUT
- Updates the  bidirectional city connection cost.
    ```
    Example using cURL
    
    curl -X --request PUT \
      http://localhost:3000/cityconnection \
      -H 'role: admin'
        -d '{
	    "point1": "Pune", 
	    "point2": "Piyush",
	    "cost": 54000
    }'
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": Success
    }
    ```
    ```
    Failure response
    Status code: 400
    
    When admin tries to update the city Connection , but the city in request does not exists.
    
    {
        "code": 400,
        "success": false,
        "message": "City Connection does not exist"
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When admin tries to hit the api , but there is no role:admin in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```

## User Authorized API's: 

### GET All paths from source to destination with direct, one stop and two stop connections.

- API: ```localhost:3000/paths?source=Pune&destination=Kashmir```
- HTTP method: GET
- Gets the cities with direct, one stop and two stop paths from source to destination.
    ```
    Example using cURL
    
    curl -X --request GET 'http://localhost/paths?source=Pune&destination=Kashmir' \
    -H "role: user"
    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "paths": {
            "directConnection": {
                "path": "Pune-Kashmir",
                "cost": 51
            },
            "oneStopConnections": [
                {
                    "path": "Pune-Bengaluru-Kashmir",
                    "cost": 65
                },
                {
                    "path": "Pune-Delhi-Kashmir",
                    "cost": 530
                }
            ],
            "twoStopConnections": [
                {
                    "path": "Pune-Mumbai-Thane-Kashmir",
                    "cost": 120
                },
                {
                    "path": "Pune-Mumbai-Bengaluru-Kashmir",
                    "cost": 129
                },
                {
                    "path": "Pune-Delhi-Thane-Kashmir",
                    "cost": 580
                }
            ]
        }
    }
    ```
    ```
    Failure response
    Status code: 401
    
    When user tries to hit the api , but there is no role:user in header.
    
    {
        "code": 401,
        "success": false,
        "message": "Not Authorized"
    }
    ```
    ```
    Failure response
    Status code: 400
    
    When user tries to hit the api, but wrong city name.
    
    {
        "code": 400,
        "success": false,
        "message": "Not Authorized"
    }
    ```
-----
# Test cases

- Run **npm test** from command line at the root directory of the project to run the test cases.
- Test cases are run on seperate **test** database. As we don't want to run test cases on our actual live DB!
