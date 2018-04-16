# map-side-bar

## Purpose
This service forms a part of the WeGot food review website. It renders basic information about a restaurant, including the opening hours, address, phone number, and links to website and to google maps for directions. In addition, the service renders a map centered on the location of the restaurant, with a labeled marker.

## Description
The service is composed of a server, a  client, and a database.

### Server API
- A request to the root will redirect to the /restaurants/:id path with a default restaurant id
- Serves static client files in response to a GET request to the /restaurants/:id path
- It also serves json formatted restaurant data in response to a GET request to the /api/restaurants/:id/sidebar endpoint.

### Database
A MongoDB database that holds restaurant information.

### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
Start server
```sh
node dist/server/server_bundle.js
```

### Prerequisites
- npm
- node
- jest
- MongoDB

### Installation
Install dependencies
```sh
npm install
```

To start, in your browser navigate to: [http://[MODULE_SERVER_IP]:3003](http://localhost:3003)
