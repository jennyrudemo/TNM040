import React from 'react';
import logo from './logo.svg';
import './App.css';
import countries from 'world-countries';



const CountryInfo = props => {

  const Bar = () => {
    let ratio = props.data.area/17098242;
    const result = ratio*100 +"%";
    //console.log(ratio);

    return (
      <div className="bar" style={{
        width: result 
      }}></div>
      )
  };

  console.log(props.detailed);

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
   
   <div className="countryBox">

    <div className="countryName">
    {props.data.name.common}
    </div>

    <p>
    {props.data.area} km<sup>2</sup>
    </p>

    {Bar()}

    {Details(props.detailed)}

    </div>
    );
};



function App() {
//console.log(countries);



//sortera länderna efter area med sort
countries.sort((a,b) => b.area - a.area);
//console.log(countries);

//filtrera bort Antarktis
let filteredCountries = countries.filter(country => country.name.common !== "Antarctica");
//console.log(filteredCountries);


//välj ut första 15 med slice
let top15countries = filteredCountries.slice(0,15);
console.log(top15countries);

//const top = top15countries.filter(data => data.name.common !== 'Antarctica');

//dela in i topp 5 och topp 6 till 15
let top5countries = top15countries.slice(0,5);
let top6to15countries = top15countries.slice(6,15);

  //let sortedCountries = countries.sort();
  //console.log(sortedCountries);

  /*for (let i=0; i < 15 ; i++){
      <CountryInfo data={countries[i]}/>
    };*/

    //{top15countries.map(country => (<CountryInfo data=top15countries[]))}

  return (
    <div className="App">
    
    {top5countries.map(country => (<CountryInfo key= {country.cca3} detailed={true} data={country}/>))}


    {top6to15countries.map(country => (<CountryInfo key= {country.cca3} detailed={false} data={country}/>))}
    //country är all data som finns om ett land
     
    </div>
    
  );
}

export default App;
