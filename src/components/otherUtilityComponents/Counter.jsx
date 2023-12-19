import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './otherStyles.css';

function Counter({ lowerBound, upperBound, doSet }) {
    const [num, setNum] = useState(lowerBound);
    useEffect(() => {
      if(num==upperBound){
        alert("Maximum limit reached!");
      }
      doSet(num);
    }, [num]);
    return (
      <div className="counter">
        <div
          className="increment"
          onClick={() => {
            setNum((old) => {
              if (old > lowerBound) {
                return old - 1;
              } else {
                return old;
              }
            });
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div>{num}</div>
        <div
          className="decrement"
          onClick={() => {
            setNum((old) => {
              if (old < upperBound) {
                return old + 1;
              } else {
                return old;
              }
            });
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    );
  }

  export default Counter;