import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/Quote.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import TwitterIcon from "@material-ui/icons/Twitter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import $ from "jquery";
import CircularProgress from '@material-ui/core/CircularProgress';

function randomColor() {
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    let color = "#"  + r + g + b;
    return color;
  }

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const url = "https://api.quotable.io/random";


  const updateQuote = () => {
    axios.get(url).then((response) => {
      setQuote(response.data);
    });
  };


    $(document).ready(function () {
        var rand = randomColor();
        $('#quote').css('color',rand);
        $('#author').css('color',rand);
        $('#twitterBtn').css('color',rand)
        $('Button').css('background', rand);
        $('Button').css('color', 'white')
        $('body').css('background',rand);
        })

  useEffect(() => {
    updateQuote();
    }, []);

  if (!quote) return <CircularProgress/>;

  const twitterLink =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=".concat(
      `${quote.content} - ${quote.author}`
    );


return (
    <Container maxWidth="md" id="centered">
      <Card id="quote-box">
        <CardContent id="box-content">
          <Typography variant="h5" component="h2" id="quote" >
            <FormatQuoteIcon fontSize="large" />
            {quote.content}
          </Typography>
          <Typography id="author">&mdash;{quote.author}</Typography>
          <Box className="buttons">
            <Button
              variant="outlined"
              href={twitterLink}
              target="_blank"
              id="twitterBtn"
            >
              <TwitterIcon />
              Tweet Quote
            </Button>
            <Button variant="contained" onClick={updateQuote} id="quoteBtn">
              <AutorenewIcon />
              New Quote
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Button vartiant="outlined" id="footer" href="https://github.com/mdluc" target="_blank">@mdluc</Button>
    </Container>
  );
}
