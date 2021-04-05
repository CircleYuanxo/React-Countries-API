import { Link } from "react-router-dom";
import { SimpleImg } from 'react-simple-img';


function CountryItem( {country, color } ) {

  return (
    <Link to={country.alpha3Code}>
      <div className='countrylist__card' style={{background:color.element, color: color.color}}>
          <div><SimpleImg height={138} src={country.flag} alt={country.name}></SimpleImg></div>
          <div>
            <h2>{country.name}</h2>
            <div>Populatoin: <span>{country.population.toLocaleString()}</span></div>
            <div>Region: <span>{country.region}</span></div>
            <div>Capital: <span>{country.capital}</span></div>
          </div>
        </div>
      </Link>
  );
}

export default CountryItem;
