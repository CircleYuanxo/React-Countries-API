import { useEffect, useState, Fragment } from 'react';
import { getAll, getCountrybyCode } from '../WebAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";


function Detailpage( { color} ) {
  let { alphaCode } = useParams()

  const [ country, setCountry ] = useState([])
  const [ countries, setCountries ] = useState([])
  const [ countryCurrencies, setCountryCurrencies ] = useState([])
  const [ countryLanguages, setCountryLanguages] = useState([])
  const [ countryBorders, setCountryBorders] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getCountrybyCode(alphaCode).then((res) => {
      if (res.status !== 400) {
        setCountry(res)
        setIsLoading(false)
      }
      console.log(country)
      console.log(isLoading)
    })

  }, [alphaCode])

  useEffect(() => {
    const { currencies, languages, borders } = country
    if (currencies === undefined || languages === undefined || borders === undefined) return
    setCountryBorders(borders)
    setCountryCurrencies(currencies)
    setCountryLanguages(languages)
  }, [country])

  useEffect(()=> {
    getAll().then((res) => {
      setCountries(res)
    })
  })


  return (
    <Fragment>
      {isLoading && <div style={{background:color.background, color:color.color}} className='isLoading'>Loading...</div>}
      <div className='detailpage' style={{background:color.background, color:color.color}}>
       <Link to={process.env.PUBLIC_URL + '/'}>
        <button className='button__back' style={{background:color.element, color:color.color}}>
          <FontAwesomeIcon icon={faArrowLeft}/>　Back
        </button>
       </Link>
       <div className='countrydetail'>
         <div className='countrydetail__flag'>
           <img src={country.flag} alt='flag' />
         </div>
         <div className='countrydetail__content'>
           <div>
             <h1>{country.name}</h1>
             <div className='countrydetail__content__description'>
               <div>
                 <p><span>Native Name: </span>{country.nativeName}</p>
                 <p><span>Population: </span>{country.length !== 0 && country.population}</p>
                 <p><span>Region: </span>{country.region}</p>
                 <p><span>Sub Region: </span>{country.subregion}</p>
                 <p><span>Capital: </span>{country.capital}</p>
               </div>
               <div>
                 <p><span>Top Level Domain: </span>{country.topLevelDomain}</p>
                 <p><span>Currencies: </span>{countryCurrencies.map(item => item.name)}</p>
                 <p><span>Languages: </span>{countryLanguages.map((item, idx, arr) => arr.length === 1 ? item.name : idx + 1 !== arr.length ? item.name + ', ' : item.name)}</p>
               </div>
             </div>
           </div>
           <div className='countrydetail__content__borders'>
             <div>
               <h3>Border Countries: </h3>
             </div>
             <div>
               {countryBorders && countryBorders.map((border)=>{
                 const nameCountryBorders = countries.find(country => country.alpha3Code === border)
                 if (nameCountryBorders) return (
                   <Link to={process.env.PUBLIC_URL + `/${border}`} key={border}><button style={{background:color.element, color:color.color}}>{nameCountryBorders.name}</button></Link>
                 )
               })}
            </div>
           </div>
         </div>
       </div>
     </div>
   </Fragment>
  );
}

export default Detailpage;
