import React, {useEffect} from 'react';
import {cities} from '../api/cities';
import {useCity} from "../Context/CityContext";
import {Form} from "react-bootstrap";

function FormCity() {
    const {city, setCity} = useCity();
    useEffect(() => {
        localStorage.setItem("city", city)
    }, [city])

    function handleChange(e) {
        setCity(e.target.value)
    }

    return (
        <div>

            <Form.Select name="city" onChange={(e) => handleChange(e)} value={city}>
                {
                    cities.map((cit, index) => (
                        <option key={cit} value={cit}> {cit} </option>
                    ))
                }
            </Form.Select>
        </div>
    );
}

export default FormCity;