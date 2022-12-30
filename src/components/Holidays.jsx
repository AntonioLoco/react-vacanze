import React, { useEffect, useState } from "react";
import Title from "./Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
const url = "https://react--course-api.herokuapp.com/api/v1/data/vacanze";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentShow, setCurrentShow] = useState(1);

  const getHolidaysData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.get(url);
      setHolidays(response.data.data);
      console.log(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const nextHoliday = () => {
    if (currentShow === holidays.length) {
      setCurrentShow(1);
    } else {
      setCurrentShow((old) => old + 1);
    }
  };

  const prevHoliday = () => {
    if (currentShow === 1) {
      setCurrentShow(holidays.length);
    } else {
      setCurrentShow((old) => old - 1);
    }
  };

  useEffect(() => {
    getHolidaysData();
  }, []);

  if (isLoading) {
    return (
      <div className="container text-center pt-5">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container text-center pt-5">
        <Error />
      </div>
    );
  }

  return (
    <div className="container text-center pt-5">
      <Title />
      <div className="commands py-3">
        <button className="btn btn-primary mx-2" onClick={prevHoliday}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="btn btn-primary mx-2" onClick={nextHoliday}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="row">
        {holidays.map((holiday) => {
          return (
            <div
              className={
                currentShow == holiday.id
                  ? "col-8 offset-2  my-card active"
                  : "col-8 offset-2 my-card"
              }
              key={holiday.id}
            >
              <div className="card shadow">
                <img src={holiday.img} className="card-img-top" alt="..." />
                <div className="card-body px-3">
                  <h5 className="card-title">{holiday.titolo}</h5>
                  <p className="card-text">{holiday.descrizione}</p>
                  <div className="card-text d-flex align-items-center justify-content-between fw-bold">
                    <p>{holiday.durata}</p>
                    <p className="text-info">
                      {(holiday.prezzo / 100).toFixed(2)}$
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holidays;
