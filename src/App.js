import React, {useState, useRef} from 'react';
import Game from './components/Game'
import TopScores from './components/TopScores'

const App = () => {
  const [navLoc, setNavLoc] = useState("home")
  const menuRef = useRef()

  const content = () => {
    switch(navLoc) {
      case "home":
        return(<Game />)
      case "top-scores":
        return(<TopScores />)
      default:
        return(<Game />)
    }
  }

  const setLoc = (loc) => {
    setNavLoc(loc)
    menuRef.current.checked = !menuRef.current.checked
  }
  
  return (
    <>
      <div className="mobile-nav-wrap">
        <input type="checkbox" ref={menuRef} className="toggler" />
        <div className="mobile-nav-menu">
          <div onClick={() => setLoc("home")}>Peli</div>
          <div onClick={() => setLoc("top-scores")}>Top pisteet</div>
          <a href="https://github.com/wintala/Jallu-muistipeli-front">Github</a>
        </div>
        <div className="mobile-nav-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img src={require('./logo.png')} alt="Logo" />
      </div>
      {content()}
    </>
  )
}


export default App;
