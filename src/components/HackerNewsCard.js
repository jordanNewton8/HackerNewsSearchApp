import { Card, CardContent, Button, CardActions, Typography, Divider, Link } from '@material-ui/core'
import React from 'react'
import '../Styles/styles.scss'


//Some default const(ses) just in case (for whatever reason) the fields are empty in the returned search results. 
const DEFAULT_HEADLINE = "NO HEADLINE FOUND";
const DEFAULT_AUTHOR = "UNKNOWN AUTHOR";
const DEFAULT_URL = "NO URL FOUND";
const DEFAULT_STORY_TEXT = "...";
const DEFAULT_POINTS = "NO POINTS FOUND";


/* A single card holding the details of a result returned from the hacker news API */
function HackerNewsCard(props){
    //Check if fields exist and use defaults if needed
    const news = props.news;
    const title = news.title === undefined ? DEFAULT_HEADLINE : news.title;
    const author = news.author === undefined ? DEFAULT_AUTHOR : news.author;
    const url = news.url === undefined ? DEFAULT_URL : news.url;
    const points = news.points === undefined ? DEFAULT_POINTS : news.points;

    /*const storyText = news.StoryText === undefined ? DEFAULT_STORY_TEXT : news.StoryText;
        Didn't get any hits that had storyText so just commented it out */
     
    return(
        <Card className="hacker-news-card">
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Link href={url} variant="overline">{url}</Link>
                <Divider/>
                <Typography variant="body2" className="storyText">
                    Posted by: {author}
                </Typography>
                <Typography variant="body2" className="storyText">
                    Points: {points}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default HackerNewsCard
