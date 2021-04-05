import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

function Header( {handleThemeChange, color} ) {

  const [ isDark, setIsDark ] = useState(false)

  const handleModeClick = () => {
    setIsDark(!isDark)
    console.log('clicked')
    handleThemeChange(!isDark ? true : false)
  }


  return (
    <div className='header' style={{background:color.element, color: color.color}}>
      <div>Where in the world?</div>
      <div className='header__modeToggle' onClick={handleModeClick}><FontAwesomeIcon icon={faMoon} />  {isDark ? 'Light' : 'Dark'} Mode</div>
    </div>
  );
}

export default Header;
