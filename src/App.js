import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};


const center = {
  lat: 26.913165,
  lng: 75.803035
};

function MyComponent() {

  const [data,setData] = useState([])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDvr_LmzYgdLaL7BgzxnZmln9TowpgW6z8'
  })

  function getCoordinates(address){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+'AIzaSyDvr_LmzYgdLaL7BgzxnZmln9TowpgW6z8')
      .then(response => response.json())
      .then(data => {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        console.log({latitude, longitude})
      })
  }

  const [map, setMap] = React.useState(null)
  const API_KEY = 'AIzaSyDvr_LmzYgdLaL7BgzxnZmln9TowpgW6z8'

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={getCoordinates}
        // onClick={(e) => {
    // console.log("latitude = ", e.lat)
    // console.log(e.latLng)
    // console.log("longtitude = ", e.lng);}}
      >
        <></>
      </GoogleMap>
  ) : <></>
}



export default React.memo(MyComponent)