import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
//https://disease.sh/v3/covid-19/historical/all?lastdays=120
const options = {
    legend:{
        display: false,
    },
    elements:{
        point:{
            radius:0
        },
    },
    maintainAspectRation: false,
    tooltips:{
        mode: 'index',
        intersection: false,
        callbacks: {
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:'time',
                time:{
                    format: "MM/DD/YY",
                    tooltopformat: "ll",
                },
            
            },
        ],
        yAxes:[
            {
                gridLines:{
                    display: false,
                },
                ticks:{
                    callback: function(value, index, values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}
function LineGraph(){
    const [data, setdata] = useState({})
    console.log(data)
    const buildChartData = (data =>{
        const chartData = []
        let lastDataPoint
        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint ={
                    x: date,
                    y:data['cases'][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data['cases'][date]
        }
        return chartData
    })

    useEffect(()=>{
        const getUrlData = async ()=>{
           await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const chartData = buildChartData(data)
                setdata(chartData)
            })
        }
        getUrlData()
    },[])

    return(
        <div className="Line">
             {/* hello this is Line graph */}
             {data?.length>0 && (                          <Line 
                          options={options}
                          data={{
                           datasets: [
                               {
                                  backgroundColor: "rgba(204, 26, 52, 0.5",
                                  borderColor: '#4CC103',
                                   data:data,
                               }
                           ]
                       }}/>)

             }

        </div>
    )
}

export default LineGraph