import React, {useState,useEffect} from 'react'
// import {
//      Card, CardContent
// } from '@material-ui/core'
import {card} from 'react-bootstrap'

function IndiaCases(){
    const [getCases, setCases] = useState([])
    console.log(getCases)
    const [getIndia, setIndia] = useState([])
    useEffect(() => {
        const apiurl = 'https://api.covid19india.org/data.json'
        fetch(apiurl)
        .then((response)=> response.json())
        .then(data => {
            const states = data.statewise.map(state =>({
                value: state.state,
                state: state.state,
                newcases: state.deltaconfirmed,
                newrecovered: state.deltarecovered,
                newdeaths: state.deltadeaths,
                active: state.active,
                confirmed: state.confirmed,
                deaths: state.deaths,
                recovered: state.recovered,
            }))
            setCases(states)
        })
        console.log(getCases)
    },[])
    // const onStateChange = (event)=>{
    //     const state = event.target.value
    //     console.log(`You have selected ${state} state`)
    //     const url = ""
    // }
    useEffect(()=>{
        const countrycode = "IN"
        const url = `https://disease.sh/v3/covid-19/countries/${countrycode}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setIndia(data)
        })
    },[])
    return(
        <div className="IndiaCases">
           <div className='headingDiv'><h2><sapn className="india">India</sapn><span className="covid">Covid19</span><span className="cases">Cases</span></h2> </div>
            <div className="indiaContent">
                {
                    <div className="indiancases"> 
                    <div className="casesDivConfirmed">
                        <p className="p1 redcolor">Confirmed</p>
                        <p className="p2 redcolor">+{getIndia.todayCases}</p>
                        <p className="p3 redcolor">{getIndia.cases}</p>
                    </div>
                    <div className="casesDivActive">
                        <p className="p1 bluecolor">Active</p>
                        <p className="p3 p4 bluecolor">{getIndia.active}</p>
                    </div>
                    <div className="casesDivRecovered">
                        <p className="p1 greencolor">Recovered</p>
                        <p className="p2 greencolor">+{getIndia.todayRecovered}</p>
                        <p className="p3 greencolor">{getIndia.recovered}</p>
                    </div>
                    <div className="casesDivDeath">
                        <p className="p1 graycolor">Death</p>
                        <p className="p2 graycolor">+{getIndia.todayDeaths}</p>
                        <p className="p3 graycolor">{getIndia.deaths}</p>
                    </div>
                    </div>
                }
            </div>
            <div className='maindivnews'>
            <card className="stateNews">
                <div className="stateContent">
                     <p>State</p>
                     <p>Confirmed</p>
                     <p>Active</p>
                     <p>Recovered</p>
                     <p>Deaths</p>   
                </div>
            </card>
            <div>
            {
                getCases.map(state => (
                    <div  className="card">
                        <div className="card-body">

                        <p className='borderit'>{state.state}</p>
                        <p className='makeitsame borderit'><span>{state.confirmed}</span><span className='isRed'>+{state.newcases}</span></p>
                        <p className='borderit'>{state.active}</p>
                        <p className='makeitsame borderit'><span>{state.recovered}</span><span className='isGreen'>+{state.newrecovered}</span></p>
                        <p className='makeitsame borderit'><span>{state.deaths}</span><span className='isGray'>+{state.newdeaths}</span></p>
                    
                        </div>
                    </div>

                ))
            }
            </div>
          </div>

        </div>
    )
}

export default IndiaCases