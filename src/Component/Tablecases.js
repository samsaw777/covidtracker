import React ,{useState, useEffect}from 'react'
import {Card , CardContent} from '@material-ui/core'
import LineGraph from './LineGraph'
// import {Link} from 'react-router-dom'
// https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=00c500ebc1584894862c1cca4a6d6722
function Tablecases({countries}){
    const sortTable = (data)=>{
        const sortedData = [...data];
        sortedData.sort((a,b)=>{
            if (a.cases > b.cases){
                return -1
            }else{
                return 1
            }    
        })
        return sortedData
    }
    const [TableContent, setTableContent] = useState([])

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data=>{
            const sortTables = sortTable(data)
            setTableContent(sortTables)
        })
    },[])
    const getCountryData = (event)=>{
        event.preventDefault()
        const getCountry = event.target.value
        console.log(`You have selected ${getCountry}`)
    }
    return (
        <div className="table">
            <div>
            <Card className="table_left">
                <CardContent>
                    <h2 className='headertable'>Cases By Countries</h2>
                    {/* {
                        countries.map(({country,cases})=>(
                            <tr>
                            <td>{country}</td>
                        <td>{cases}</td>
                        </tr>
                        ))
                    } */}
                    <div className="tableContent">
                    {
                        TableContent.map(content =>(
                            <tr onClick={getCountryData} value={content.country}>
                                <td>{content.country}</td>
                                <td><strong>{content.cases}</strong></td>
                            </tr>
                        ))
                    }
                    </div>

                    <div className="LineGraph">
                    <h3>WorldWide</h3>
                        <LineGraph />
                    </div>
                </CardContent>
            </Card>
            </div>
           
        </div>
    )
}

export default Tablecases