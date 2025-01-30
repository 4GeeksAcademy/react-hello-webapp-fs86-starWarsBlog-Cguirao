import React, { useEffect, useRef } from "react";
import '../../styles/home.css';

const Home = () => {
  const bylineRef = useRef(null);

  useEffect(() => {
   
    const byline = bylineRef.current;

    if (byline) {
      let bylineText = byline.innerHTML;       
      let bylineArr = bylineText.split('');    
      byline.innerHTML = '';                    

     
      let span;
      let letter;

    
      for (let i = 0; i < bylineArr.length; i++) {
        span = document.createElement("span"); 
        letter = document.createTextNode(bylineArr[i]); 

        if (bylineArr[i] === ' ') {           
          byline.appendChild(letter);          
        } else {
          span.appendChild(letter);             
          byline.appendChild(span);            
        }
      }
    }
  }, []); 

  return (
    <div className="starwars-demo">
      <img
        src="https://cssanimation.rocks/demo/starwars/images/star.svg"
        alt="Star"
        className="star"
      />
      <img
        src="https://cssanimation.rocks/demo/starwars/images/wars.svg"
        alt="Wars"
        className="wars"
      />
    </div>
  );
}

export default Home;
