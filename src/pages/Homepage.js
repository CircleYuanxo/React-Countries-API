import { useState } from 'react'
import InputSearchFilter from '../components/InputSearchFilter'
import CountryItem from '../components/CountryItem'
import InfiniteScroll from 'react-infinite-scroll-component';

function Homepage( {countries, color} ) {

  const [ inputFilter, setInputFiler ] = useState('')
  const [ regionFilter, setRegionFilter ] = useState('')

  const [ loadingLength, setLoadingLength ] = useState(8)
  const handleLoading = () => {
    setLoadingLength(prevState => prevState + 5)
  }

  const handleInputSearch = (inputValue) => {
      setInputFiler(inputValue)
  }
  const handleRegionFilter = (region) => {
    setRegionFilter(region)
    console.log('call')
  }


  return (
    <div style={{background:color.background, color: color.color}}>
      <InputSearchFilter handleRegionFilter={handleRegionFilter}
                         regionFilter={regionFilter}
                         handleInputSearch={handleInputSearch}
                         color={color}/>
       <InfiniteScroll
         dataLength={loadingLength}
         next={handleLoading}
         hasMore={countries.length >= loadingLength ? true : false}
       >
        <div className='countrylist'>
          {countries && countries
            .filter((country)=> {
              if (regionFilter === '') return country
              return country.region === regionFilter
          })
            .filter((country, idx, arr)=> {
              if (inputFilter === '') return country
              return country.name.toLowerCase().includes(inputFilter.toLowerCase())
            })
            .slice(0, loadingLength).map((country, idx, arr) => {
              return (
                <CountryItem key={country.alpha2Code} country={country} color={color} countries={countries}/>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Homepage;
