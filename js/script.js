// Whole-script strict mode syntax
'use strict';

var map;
var infowindow;
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
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Buvette",
    location: {lat: 40.7327005, lng: -74.0043166},
    streetAddress: "42 Grove St (btwn Bedford & Bleecker St)",
    cityAddress: "New York, NY 10014",
    id: "bar1",
    fs_id: "4d0bf7e3f29c236ac675bfe7",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Marea",
    location: {lat: 40.7674524, lng: -73.98111419999999},
    streetAddress: "240 Central Park S (at 59th St & Broadway)",
    cityAddress: "New York, NY 10019",
    id: "bar2",
    fs_id: "4a0babaaf964a52007751fe3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Gramercy Tavern",
    location: {lat: 40.7384555, lng: -73.98850639999999},
    streetAddress: "42 E 20th St (btwn Broadway & Park Ave)",
    cityAddress: "New York, NY 10003",
    id: "bar3",
    fs_id: "3fd66200f964a520aee91ee3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "BCD Tofu House",
    location: {lat: 40.7477712, lng: -73.9874152},
    streetAddress: "5 W 32nd St (btwn Broadway & 5th Ave)",
    cityAddress: "New York, NY 10001",
    id: "bar4",
    fs_id: "517563f9498e0a4859d08fe4",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Maialino",
    location: {lat: 40.7387533, lng: -73.98552269999999},
    streetAddress: "2 Lexington Ave (at Gramercy Park N)",
    cityAddress: "New York, NY 10010",
    id: "bar5",
    fs_id: "4afb2990f964a520a91b22e3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Momoya",
    location: {lat: 40.7426323, lng: -73.9964248},
    streetAddress: "185 7th Ave (at W 21st St)",
    cityAddress: "New York, NY 10011",
    id: "bar6",
    fs_id: "49d991d9f964a5204a5e1fe3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Le Bernardin",
    location: {lat: 40.7615691, lng: -73.98180479999999},
    streetAddress: "155 W 51st St (btwn 6th & 7th Ave)",
    cityAddress: "New York, NY 10019",
    id: "bar7",
    fs_id: "3fd66200f964a52066e31ee3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Gabriel Kreuther",
    location: {lat: 40.754538, lng: -73.98250279999999},
    streetAddress: "41 W 42nd St (btwn 5th & 6th Ave)",
    cityAddress: "New York, NY 10036",
    id: "bar8",
    fs_id: "5552087d498eb30c149f785a",
    visible: ko.observable(true),
    boolTest: true
    }
];

// Foursquare API Url parameter
var BaseUrl = "https://api.foursquare.com/v2/venues/",
    fsClient_id = "client_id=1MLSU0CSADQAGUXI3YAAKHJA2XWOYQZCMNF00UOJVYFRCABO",
    fsClient_secret = "&client_secret=EMH23JNMX0DSDPGQRSINJ12MKZ3I34LNF5YQC53FP3A0LRBH",
    fsVersion = "&v=20170801";

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
    if($(window).width() <= 1200) {
        mapOptions.zoom = 12;
    }
    if ($(window).width() < 640) {
        hideBar();
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    infowindow = new google.maps.InfoWindow({
        maxWidth: 250,
        content: ""
    });
    bounds = new google.maps.LatLngBounds();

    // Close infowindow when clicked elsewhere on the map
    map.addListener("click", function(){
        infowindow.close(infowindow);
    });

    //Responsive map
    function responseMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1200) {
            map.setZoom(12);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1200) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);
        }
    }
    $("#reset").click(function() {
        responseMap();
    });
   $(window).resize(function() {
        responseMap();
    });


    // Create restaurant object
    var Restaurant = function (data, id, map) {
        var self = this;
        this.title = ko.observable(data.title);
        this.location = data.location;
        this.streetAddress = data.streetAddress;
        this.cityAddress = data.cityAddress;
        this.marker = "";
        this.markerId = data.id;
        this.fs_id = data.fs_id;
        this.shortUrl = "";
    }

    // Get content infowindows
    function getContent(restaurant) {
        var contentString = '<img src="' + restaurant.googleStreetView +
          '" alt="Street View Image of ' + restaurant.title + '"><h3>' +
          restaurant.title + '</h3><a class="link" href="' + restaurant.shortUrl +
          '" target="_blank">Explore more</a><img src="img/foursquare_logo.png">';
        var errorString = "Oops, Foursquare Link not available."
        if (restaurant.title.length > 0) {
          return contentString;
          } else {
          return errorString;
          }
    }

    // Bounce effect on marker
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 700);
        }
    };

    function ViewModel() {
        var self = this;

        // Creating items from the restaurant list
        this.restaurantList = ko.observableArray();
        locations.forEach(function(item){
          self.restaurantList.push(new Restaurant(item));
        });

        // Create a marker per item
        this.restaurantList().forEach(function(restaurant) {
          var marker = new google.maps.Marker({
            map: map,
            position: restaurant.location,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'img/dining_icon.png',
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0),
            }
          });
          restaurant.marker = marker;
          // Extend the boundaries of the map for each marker
          bounds.extend(marker.position);
          // Create an onclick event to open an infowindow and bounce the marker at each marker
          marker.addListener("click", function(e) {
            map.panTo(this.position);
            infowindow.setContent(getContent(restaurant));
            infowindow.open(map, marker);
            toggleBounce(marker);
            var windowWidth = $(window).width();
            if(windowWidth <= 1200) {
              map.setZoom(13);
            } else if(windowWidth > 1200) {
              map.setZoom(15);
            }
          });
        });

        //Get Google Street View Image for each location

        self.getGoogleStreetView = ko.computed(function(){
          self.restaurantList().forEach(function(restaurant) {
            var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=250x150&location=';
            restaurant.googleStreetView = streetViewUrl + restaurant.location.lat + ',' + restaurant.location.lng + '&fov=120&pitch=0';
          });
        });
        // Foursquare API request
        self.getFoursquareData = ko.computed(function(){
          self.restaurantList().forEach(function(restaurant) {

            // Set initail variables to build the correct URL for each restaurant
            var  venueId = restaurant.fs_id + "/?";
            var foursquareUrl = BaseUrl + venueId + fsClient_id + fsClient_secret + fsVersion;

            // AJAX call to Foursquare
            var request = $.ajax({
              type: "GET",
              url: foursquareUrl,
              dataType: "json",
              cache: false,
              success: function(data) {
                var response = data.response ? data.response : "";
                var venue = response.venue ? data.venue : "";
                restaurant.title = response.venue["name"];
                restaurant.shortUrl = response.venue["shortUrl"];
              }
            });

            // AJAX fail function

            request.fail(function() {
              alert('Foursquare could not be loaded.');
            });

          });
        });


        // Creating click for the list item
        this.itemClick = function (restaurant) {
          var markerId = restaurant.markerId;
          google.maps.event.trigger(restaurant.marker, "click");
        }


        // Filtering the restaurant list
        self.filter = ko.observable("");

        this.filteredRestaurantList = ko.dependentObservable(function() {
          var q = this.filter().toLowerCase();
          //var self = this;
          if (!q) {
          // Return self.restaurantList() the original array;
          return ko.utils.arrayFilter(self.restaurantList(), function(item) {
            item.marker.setVisible(true);
            return true;
          });
          } else {
            return ko.utils.arrayFilter(this.restaurantList(), function(item) {
              if (item.title.toLowerCase().indexOf(q) >= 0) {
              return true;
              } else {
                item.marker.setVisible(false);
              return false;
              }
            });
          }
        }, this);
    };

    // Activates knockout.js
    ko.applyBindings(new ViewModel());
}
//Hide or show sidebar on click
var sideBarDisplay = true;
function noSideBar() {
    $("#side-bar").animate({
                height: 0,
            }, 500);
            setTimeout(function() {
                $("#side-bar").hide();
            }, 500);
            $("#arrow").attr("src", "img/click_down.gif");
            sideBarDisplay = false;
}
function yesSideBar() {
    $("#side-bar").show();
            var listHeight = $("#list-container").height();
            if($(window).height() < 400) {
                $("#side-bar").animate({
                    height: listHeight,
                }, 400, function() {
                    $(this).css('height','auto').css("max-height", 500);
                });
            } else {
            $("#side-bar").animate({
                height: listHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 500);
            });
            }
            $("#arrow").attr("src", "img/click_up.gif");
            sideBarDisplay = true;
}

function hideBar() {
    if(sideBarDisplay === true) {
            noSideBar();

    } else {
            yesSideBar();
    }
}
$("#arrow-bar").click(hideBar);

//Hide or show sidebar if screen width is changed

$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 640 && sideBarDisplay === true) {
            noSideBar();
        } else if($(window).height() < 500 && sideBarDisplay === true) {
            noSideBar();
        }
    if ($(window).width() >= 640 && sideBarDisplay === false) {
            if($(window).height() > 500) {
                yesSideBar();
            }
        } else if($(window).height() >= 500 && sideBarDisplay === false) {
            if($(window).width() > 640) {
                yesSideBar();
            }
        }
});