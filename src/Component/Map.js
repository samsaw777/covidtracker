import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from  'react-leaflet'
import {MapContainer as LeafletMap, TileLayer} from 'react-leaflet'
function Map({center , zoom, countries, casesType}){
  const casesTypeColors = {
    cases:{
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      multiplier: 800,
      half_op: "rgba(204, 16, 52, 0.5)",
    },
    recovered:{
      hex: "#7dd71d",
      rgb: "rgb(125,215,29)",
      multiplier: 1200,
      half_op: "rgba(125, 215, 29, 0.5)",
    },
    deaths:{
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      multiplier: 2000,
      half_op: "rgba(251, 68, 67, 0.5)",
    }
  }
    const showdataonmap = (data, casesType=casesType)=>(
      data.map(country=>(
        <Circle 
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          color="#c4c4c4"
          fillColor="#c4c4c4"
          radius={
            Math.sqrt(country[casesType])* casesTypeColors[casesType].multiplier
          }
        >
          <Popup>
            <div className="popupDiv">
              <div className="popImg">
                <img src={country.countryInfo.flag} alt="Country Flag"/>
              </div>
              <div className="popCountry">{country.country}</div>
              <div>Total: {numeral(country.cases).format("0,0")}</div>
              <div>Recovered: {numeral(country.recovered).format('0,0')}</div>
              <div>Deaths: {numeral(country.deaths).format("0,0")}</div>

            </div>
          </Popup>  

        </Circle>
      ))
    )
    return(
        <div className="map">
              {/* <h1>  I am a map </h1> */}
              <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='$copy; <a href="http://osm.org/copyright"> OpenStreetMap</a> contributors'
                />
                  {showdataonmap(countries,casesType)}
              </LeafletMap>
              
                  
        </div>
    )
}

export default Map