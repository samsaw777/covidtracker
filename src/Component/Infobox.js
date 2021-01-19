import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import numeral from "numeral"
function Infobox({title, cases,total,active,isRed,...props}){
    return(
    
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}>
            <CardContent>
                {/* Title */}
                      <Typography className="infobox_title" color="textSecondary">
                        {title}
                    </Typography>
                    {/* Cases */}
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{numeral(cases).format('0,0')}</h2>
                     {/* Total Cases */}
                    <Typography color="textSecondary" className="infobox_total">
                        {numeral(total).format('0,0')} Total
                    </Typography>               
                {/* This is a card component of the InfoBox.     */}
            </CardContent>
           
        </Card>
    )
}


export default Infobox