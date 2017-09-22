var map;
var bounds;

//Information of different restaurants
var locations = [
    {
    title: "Upland",
    location: {lat: 40.7417983, lng: -73.9847793},
    streetAddress: "345 Park Ave S (at E 26th St)",
    cityAddress: "New York, NY 10010",
    id: "bar0",
    fs_id: "5440ac89498e6faac0aa08a1",
    },
    {
    title: "Buvette",
    location: {lat: 40.7327005, lng: -74.0043166},
    streetAddress: "42 Grove St (btwn Bedford & Bleecker St)",
    cityAddress: "New York, NY 10014",
    id: "bar1",
    fs_id: "4d0bf7e3f29c236ac675bfe7",
    },
    {
    title: "Marea",
    location: {lat: 40.7674524, lng: -73.98111419999999},
    streetAddress: "240 Central Park S (at 59th St & Broadway)",
    cityAddress: "New York, NY 10019",
    id: "bar2",
    fs_id: "4a0babaaf964a52007751fe3",
    },
    {
    title: "Gramercy Tavern",
    location: {lat: 40.7384555, lng: -73.98850639999999},
    streetAddress: "42 E 20th St (btwn Broadway & Park Ave)",
    cityAddress: "New York, NY 10003",
    id: "bar3",
    fs_id: "3fd66200f964a520aee91ee3",
    },
    {
    title: "BCD Tofu House",
    location: {lat: 40.7477712, lng: -73.9874152},
    streetAddress: "5 W 32nd St (btwn Broadway & 5th Ave)",
    cityAddress: "New York, NY 10001",
    id: "bar4",
    fs_id: "517563f9498e0a4859d08fe4",
    },
    {
    title: "Maialino",
    location: {lat: 40.7387533, lng: -73.98552269999999},
    streetAddress: "2 Lexington Ave (at Gramercy Park N)",
    cityAddress: "New York, NY 10010",
    id: "bar5",
    fs_id: "4afb2990f964a520a91b22e3",
    },
    {
    title: "Momoya",
    location: {lat: 40.7426323, lng: -73.9964248},
    streetAddress: "185 7th Ave (at W 21st St)",
    cityAddress: "New York, NY 10011",
    id: "bar6",
    fs_id: "49d991d9f964a5204a5e1fe3",
    },
    {
    title: "Le Bernardin",
    location: {lat: 40.7615691, lng: -73.98180479999999},
    streetAddress: "155 W 51st St (btwn 6th & 7th Ave)",
    cityAddress: "New York, NY 10019",
    id: "bar7",
    fs_id: "3fd66200f964a52066e31ee3",
    },
    {
    title: "Gabriel Kreuther",
    location: {lat: 40.754538, lng: -73.98250279999999},
    streetAddress: "41 W 42nd St (btwn 5th & 6th Ave)",
    cityAddress: "New York, NY 10036",
    id: "bar8",
    fs_id: "5552087d498eb30c149f785a",
    }
];

//Initialize the map
function initMap() {
    // Create a styles array for the map
    var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#f7f9ea' }
        ]
      },{
        featureType: 'transit.station',
        stylers: [
          { visibility: 'off' },
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#7bb2a3' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'on' },
          { color: '#9ed1c2' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f2e3c6' },
        ]
      },{
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
          { visibility: 'off' },
        ]
      },{
        featureType: 'poi.medical',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' },
        ]
      },
    ];
    // Constructor creates a new map - only center and zoom are required
    var mapOptions = {
        zoom: 13,
        styles: styles,
        center: new google.maps.LatLng(40.7413549, -73.9980244),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    bounds = new google.maps.LatLngBounds();
};