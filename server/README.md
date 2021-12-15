# An example for how to set up a proxy with nodejs.

This is an example for how to set up a proxy and send request to theguardian to fetach news data.

## Available Scripts

In the project directory, you can run
### `yarn start`

Runs the app in the development mode.<br />
Lanuch postman, and 
Set the request type to POST and the request URL to http://localhost:3000/search. Then set Body to x-www-form-urlencoded. see below
| key           | value         |
| ------------- |:-------------:|
| term          | australia     |
| page          | 1             |

Also you can send a GET request like http://localhost:3000/search?term=australia&page=4

