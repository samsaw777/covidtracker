import React,{useState, useEffect} from 'react'
import {
    FormControl, Select, MenuItem, Card, CardContent
} from '@material-ui/core'
function NewsTab() {
    const [TableNews, setTableNews] = useState([])
console.log(TableNews)
useEffect(()=>{
    const apiKey = "00c500ebc1584894862c1cca4a6d6722";
    const topic = "covid 19";
    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`
    const getNews =  ()=>{
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        const news = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage
            // value: country.countryInfo.iso2
        }))
        console.log(data)
        setTableNews(news)
    })
}
getNews()
},[])
    return (
        <div  className="table_right">
                
        <h2>Covid Word-Wide News </h2>
        <div className="newscontent">
            {
                TableNews.map(article=>(
                <Card className="div_content">
                    <p className="news_title"><strong>{article.title}</strong></p>
                    <p className="news_image"><img src={article.image} alt="newsImage"/></p>
                    <p className="news_description">{article.description}</p>
                <p className="news_url"><a href={article.url}>{article.url}</a></p>
                
                </Card> 
                ))
            }
        </div>
    
</div>
    )
}

export default NewsTab
