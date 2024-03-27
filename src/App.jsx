import React, { useEffect, useState, useRef } from 'react';
import { IoMdSearch } from "react-icons/io";
import styles from './App.module.css';

export default function App() {
  const [country, setCountry] = useState("");
  const countRef = useRef("");
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=uzbekistan&appid=895284fb2d2c50a520ea537456963d9c`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setCountry(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); 
  const today = new Date();
  const formattedDate = `${today.getDate()}`;

  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  function handleClick(e){
    e.preventDefault();
  }

  return (
    <>
      <div className={styles.finding}>
        <input type="text" ref={countRef} className={styles.input}  placeholder='Find country'/>
        <button className={styles.search} onClick={handleClick}><IoMdSearch/></button>
      </div>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={`${styles.cloud} ${styles.front}`}>
            <span className={styles['left-front']}></span>
            <span className={styles['right-front']}></span>
          </div>
          <span className={`${styles.sun} ${styles.sunshine}`}></span>
          <span className={styles.sun}></span>
          <div className={`${styles.cloud} ${styles.back}`}>
            <span className={styles['left-back']}></span>
            <span className={styles['right-back']}></span>
          </div>
        </div>

        <div className={styles['card-header']}>
          {country && country.name && country.sys && country.sys.country && (
            <span>
              {country.name}<br />{country.sys.country}
            </span>
          )}
          <span>March {formattedDate}</span>
          <div className={styles.about}>
            {country && country.main && country.main.humidity && (
              <span>Humidity: {country.main.humidity} %</span>
            )}
            {country && country.wind && country.wind.speed && (
              <span>Wind speed: {country.wind.speed} m/s</span>
            )}
          </div>
        </div>

        <span className={styles.temp}>{country && country.main && kelvinToCelsius(country.main.temp).toFixed(2)}°</span>

        <div className={styles['temp-scale']}>
          <span>Celsius</span>
        </div>
      </div>
    </>
  );
}
