import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import {   } from '@fortawesome/free-regular-svg-icons'

function InputSearchFilter( { regionFilter, handleRegionFilter, handleInputSearch, color } ) {
  const [ isClick, setIsClick ] = useState(false)
  const [ inputValue, setInputValue ] = useState('')

  const handleInputChange = (e) => {
    let value = e.target.value
    setInputValue(value)
    handleInputSearch(value)
  }

  const handleRegionClick = (e) => {
    setIsClick(!isClick)
    console.log(e.target.innerHTML)
    handleRegionFilter(e.target.innerHTML)
  }

  const handleRemoveRegionClick = (e) => {
    e.stopPropagation()
    handleRegionFilter('')
  }


  return (
    <div className='input'>
      <FontAwesomeIcon className='input__icon'
                       icon={faSearch}
                       style={{background:color.element, color:color.colorInput}}/>
      <input type='text'
             placeholder='Search for a country...'
             value={inputValue}
             onChange={handleInputChange}
             style={{background:color.element, color:color.colorInput}}/>
      <div className='input__filter'
          onClick={(()=>setIsClick(!isClick))}
          style={{background:color.element, color:color.colorInput}}>
        {regionFilter && <div onClick={handleRemoveRegionClick}
                              className='input__filter__icon--remove'>
                          <FontAwesomeIcon icon={faTimes} />
                         </div>}
        <div>{regionFilter ? regionFilter : 'Filter by Region'}</div>
        <FontAwesomeIcon className='input__filter__icon'
                         className={ isClick ? 'clicked' : ''}
                         icon={faChevronDown} />
      </div>
      <ul className={ isClick ? 'show' : 'hide'} style={{background:color.element, color:color.colorInput}}>
        <li onClick={handleRegionClick}>Africa</li>
        <li onClick={handleRegionClick}>Asia</li>
        <li onClick={handleRegionClick}>Americas</li>
        <li onClick={handleRegionClick}>Europe</li>
        <li onClick={handleRegionClick}>Oceania</li>
      </ul>
    </div>
  );
}

export default InputSearchFilter;
