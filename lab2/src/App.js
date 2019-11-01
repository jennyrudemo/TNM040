import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import countries from 'world-countries';


const CountryInfo = props => {

  const Bar = () => {
    let ratio = props.data.area/17098242;
    const result = (ratio*100)*0.8 +"%";
    //console.log(ratio);

    return (
      <div className="bar" style={{
        width: result 
      }}></div>
      )
  };

  const Details = (bool) => {
    if(bool) {
      return (
        <p>
        Officiellt namn: {props.data.name.official}
        <br/>
        Huvudstad: {props.data.capital}
        </p>
        )
    };
  };

  return (
   
   <Link to={"/country/"+ props.data.cca3}>
     <div className="countryBox">

      <div className="countryName">
      <strong>{props.data.name.common}</strong> {props.data.area} km<sup>2</sup>
      </div>

      {Bar()}

      {Details(props.detailed)}

      </div>
    </Link>
    );
};

const getCountryByCca3 = cca3 => {

  //let currentCountry = countries.filter(country => country.cca3 === cca3)
  let currentCountry = countries.find(function(country) {

    return country.cca3 === cca3;
  });

  return currentCountry;
}


function CountryList() {

  const [searchString, setSearchString] = useState("");

  //undersöker om ett lands namn matchar med sökord, i så fall returneras true
  const match = (country) => {
    const lowerCaseWord = country.name.common.toLowerCase();
    const lowerCaseSearchString = searchString.toLowerCase();

    return lowerCaseWord.indexOf(lowerCaseSearchString) === 0;
  }

  //sortera länderna efter area med sort
  countries.sort((a,b) => b.area - a.area);

  //filtrera bort Antarktis
  let filteredCountries = countries.filter(country => country.name.common !== "Antarctica");

  let searchedCountries = filteredCountries.filter(match);
  //console.log(searchedCountries);
  let top5searchedCountries = searchedCountries.slice(0,5);

  function changeInput(event) {
    setSearchString(event.target.value);
  }

  return (
    <div className="CountryList">

    <input type="text" placeholder="Sök på land..." onChange={changeInput} />
    
    {top5searchedCountries.map(country => (<CountryInfo key= {country.cca3} detailed={false} data={country}/>))}

    </div>
    
  );
}

function CountryDetails() {
  let {cca3} = useParams();

    let countryObj = getCountryByCca3(cca3);

    let borderCountries = countryObj.borders.map(cca3 => (getCountryByCca3(cca3)));
   

  return (
    <div>
      <Link to="/">Tillbaka till söksidan</Link>

      <h1> Grannländer till {countryObj.name.common}</h1>

      {borderCountries.map(country => (<CountryInfo key={country.cca3} detailed={false} data={country} />))}

    </div>
    );
}

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/country/:cca3" component={CountryDetails}>
          <CountryDetails />
        </Route>
        <Route path="/">
          <CountryList />
        </Route>
      </Switch>
    </Router>
    );
}

export default App;
