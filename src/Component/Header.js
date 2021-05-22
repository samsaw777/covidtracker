// Importing the results from the disease.sh site
import React, {useState, useEffect} from 'react'
import {
    FormControl, Select, MenuItem, Card, CardContent
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import InfoBox from './Infobox.js'
import Map from './Map'
import TableCases from './Tablecases'
// https://disease.sh/v3/covid-19/countries
function Header() {
const [countries, setCountries] = useState([])
const [country, setCountry] = useState("worldwide")
const [countryInfo, setcountryInfo] = useState({})
const [mapcenter, setmapcenter] = useState({ lat: 34.80746, lng: -40.4796})
const [mapzoom, setmapzoom] = useState(3)
const [mapcountries, setmapcountries] = useState([])
const [getRandomInfo, setRandomInfo] = useState([])
const [getRandomInfoTwo, setRandomInfoTwo] = useState([])
const [getRandomInfoThree, setRandomInfoThree] = useState([])
const [getRandomInfoFour, setRandomInfoFour] = useState([])
const [casesType, setCasesType] = useState("cases");
console.log(casesType)
useEffect(()=>{
    
        fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data =>{
             setcountryInfo(data)         
         })
    
},[])
useEffect(() => {
   const getCountries = async () =>{
       await fetch('https://disease.sh/v3/covid-19/countries')
       .then(response => response.json())
       .then(data =>{
           const countries = data.map(country => ({
               name: country.country,
               value: country.countryInfo.iso2
           }))
           setCountries(countries)
           setmapcountries(data)
       })
   }
   getCountries()
}, [])
// useEffect(()=>{
//     const interval = setInterval(()=>{
//         const url = 'https://disease.sh/v3/covid-19/countries'
//         fetch(url)
//         .then(response => response.json())
//         .then(data => {

//             const randomCountry = data.map(country =>({
//                 country: country.country,
//                 flag:country.countryInfo.flag,
//             }))
//             console.log(randomCountry)
//             const randomInfo = randomCountry[Math.floor(Math.random()*randomCountry.length)]
//             console.log(randomInfo)
//             setRandomInfo(randomInfo)
           
//         })
//     },3000)
//     return ()=> clearInterval(interval)
// },[])
// console.log(getRandomInfo)
// console.log(displayRandomCountry)
console.log(getRandomInfo.countryInfo)
console.log(countries)
useEffect(()=>{
    const interval = setInterval(()=>{

        // console.log(randomInfo)
        const url = 'https://disease.sh/v3/covid-19/countries'
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const randomInfo = data[Math.floor(Math.random()*data.length)]
            setRandomInfo(randomInfo)
        })
    },3000)
    return() => clearInterval(interval)
},[])
useEffect(()=>{
    const interval = setInterval(()=>{

        // console.log(randomInfo)
        const url = 'https://disease.sh/v3/covid-19/countries'
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const randomInfo = data[Math.floor(Math.random()*data.length)]
            setRandomInfoThree(randomInfo)
        })
    },3000)
    return() => clearInterval(interval)
},[])
useEffect(()=>{
    const interval = setInterval(()=>{

        // console.log(randomInfo)
        const url = 'https://disease.sh/v3/covid-19/countries'
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const randomInfo = data[Math.floor(Math.random()*data.length)]
            setRandomInfoTwo(randomInfo)
        })
    },3000)
    return() => clearInterval(interval)
},[])
useEffect(()=>{
    const interval = setInterval(()=>{

        // console.log(randomInfo)
        const url = 'https://disease.sh/v3/covid-19/countries'
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const randomInfo = data[Math.floor(Math.random()*data.length)]
            setRandomInfoFour(randomInfo)
        })
    },3000)
    return() => clearInterval(interval)
},[])
console.log(getRandomInfo)
const onCountryChange = async (event)=>{
    const countrycode = event.target.value;
    console.log(countrycode)
    console.log("Vo hooo you have selected",countrycode)

    const url = countrycode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countrycode}`

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        setCountry(countrycode)
        setcountryInfo(data)
        setmapcenter([data.countryInfo.lat, data.countryInfo.long])
        setmapzoom(4)
    })
}
console.log("Country Info",countryInfo)
// console.log(countryRandomInfo)

    return (
        <div className="header">
            <div className="app__left">
            <div className="app__header"> 
                <h3>COVID-19 TRACKER</h3>
                {/* <Link to="covidnews">
                    <h5>Covid World Wide Cases</h5>
                </Link> */}
                <Link to="IndiaCasesByState">
                    <h5>India Cases</h5>
                </Link>
                <FormControl>
                    <Select
                        variant="outlined"
                        value={country}
                        onChange={onCountryChange}
                    >
                        <MenuItem value="worldwide">
                            Worldwide</MenuItem> 
                        {
                            countries.map(country => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                                ))
                        }
                       
                    </Select>
                </FormControl>
            </div>
            <div className="app__stats">
            <InfoBox 
            title="Corona Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} 
            isRed
            onClick={(e) => setCasesType("cases")}
            active={casesType === "cases"}/>

            <InfoBox 
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered}
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            />

            <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths}
            isRed
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}/>
            </div>
            <Map center={mapcenter} zoom={mapzoom} countries={mapcountries} casesType={casesType}/>
            </div>
            {/* <div className="app_right">
                           <div className="randomTitle"><h2>Cases Around World</h2></div> 
                            <div className="RandomMain">
                            <Card className="RandomCard">
                            <CardContent className="RandomContent">
                                <div className='RandomContentDiv'>
                                <div className='contentRandomImage'><img className="randomImg" src={getRandomInfo.countryInfo.flag} alt="country"/></div>
                                <div className='contentRandom'>
                                <p>{getRandomInfo.country}</p>
                                <p>{getRandomInfo[countryInfo.lat]}</p>
                                <p>Cases:{getRandomInfo.cases}</p>
                                <p>Active:{getRandomInfo.active}</p>
                                <p>Recovered:{getRandomInfo.recovered}</p>
                                <p>Deaths:{getRandomInfo.deaths}</p>
                                </div>
                                </div>
                            </CardContent>
                        </Card>    
                        <Card className="RandomCard">
                            <CardContent className="RandomContent">
                                <div className='RandomContentDiv'>
                                <div className='contentRandomImage'><img className="randomImg" src={getRandomInfoTwo.countryInfo.flag} alt="country"/></div>
                                <div className='contentRandom'>
                                <p className="countryName"><span>{getRandomInfoTwo.country}</span></p>
                                <p className="countryCases"><span>Cases:</span><span className="redcolor">{getRandomInfoTwo.cases}</span></p>
                                <p className="countryActive"><span>Active:</span><span className="bluecolor">{getRandomInfoTwo.active}</span></p>
                                <p className="countryRecovered"><span>Recovered:</span><span className="greencolor">{getRandomInfoTwo.recovered}</span></p>
                                <p className="countryDeaths"><span>Deaths:</span><span className="graycolor">{getRandomInfoTwo.deaths}</span></p>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="RandomCard">
                            <CardContent className="RandomContent">
                                <div className='RandomContentDiv'>
                                <div className='contentRandomImage'><img className="randomImg" src={getRandomInfoThree.countryInfo.flag} alt="country"/></div>
                                <div className='contentRandom'>
                                <p>{getRandomInfoThree.country}</p>
                                <p>Cases:{getRandomInfoThree.cases}</p>
                                <p>Active:{getRandomInfoThree.active}</p>
                                <p>Recovered:{getRandomInfoThree.recovered}</p>
                                <p>Deaths:{getRandomInfoThree.deaths}</p>
                                </div>
                                </div>
                            </CardContent>
                        </Card> 
                        <Card className="RandomCard">
                            <CardContent className="RandomContent">
                                <div className='RandomContentDiv'>
                                <div className='contentRandomImage'><img className="randomImg" src={getRandomInfoFour.countryInfo.flag} alt="country"/></div>
                                <div className='contentRandom'>
                                <p>{getRandomInfoFour.country}</p>
                                <p>Cases:{getRandomInfoFour.cases}</p>
                                <p>Active:{getRandomInfoFour.active}</p>
                                <p>Recovered:{getRandomInfoFour.recovered}</p>
                                <p>Deaths:{getRandomInfoFour.deaths}</p>
                                </div>
                                </div>
                            </CardContent>
                        </Card>    
                        </div>
                    
            </div> */}

            <TableCases />
        </div>
    )
}

export default Header