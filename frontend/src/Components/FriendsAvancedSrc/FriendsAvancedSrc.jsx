import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import UniButton from "../UniButton/UniButton";
import "./FriendsAvancedSrc.css";

export default function FriendsAvancedSrc2() {

  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  let token = localStorage.getItem("token");
  const type = "submit";
  const label = "Cerca";

  const avancedSrc = async (event) => {
    event.preventDefault();
    
    let body= {
      sex: sex,
      city: city,
      province: province,
      ageMin: ageMin,
      ageMax: ageMax,
    }
    console.log(`${process.env.REACT_APP_SERVER_URL}`)
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/avanced/src`,
      {
        method:"POST",
        body: JSON.stringify(body),
        headers:{"Content-type":"application/json;charset=UTF-8"}
      })

      if(response.ok){
        let json = await response.json();
        console.log("Fetch src success!");
        console.log(json);
      }else{
        console.log("Fetch src failed!");
      }
  };

  return (
    <Container fluid className="form-src-cnt d-flex flex-column align-items-center py-3">
      <h4 className="text-center">Ricerca Avanzata</h4>
      <Form onSubmit={(event)=>avancedSrc(event)} className="px-2">
        <Form.Control
          onChange={(event) => setProvince(event.target.value)}
          className="my-2"
          size="sm"
          type="text"
          placeholder="Provincia"
        />
        <Form.Control
          onChange={(event) => setCity(event.target.value)}
          className="my-2"
          size="sm"
          type="text"
          placeholder="Cttà"
        />
        <div className="d-flex">
          <Form.Control
            onChange={(event) => setAgeMin(event.target.value)}
            className="me-1"
            size="sm"
            type="number"
            placeholder="Età min."
          />
          <Form.Control
            onChange={(event) => setAgeMax(event.target.value)}
            size="sm"
            type="number"
            placeholder="Età max."
          />
        </div>
        <Form.Check type="radio" id="sex" className="ms-3 mt-3">
          <Form.Check.Input
            onChange={(event) => setSex(event.target.value)}
            type="radio"
            name="sex"
            value={"male"}
            isValid
          />
          <Form.Check.Label style={{ color: "black" }}>Maschio</Form.Check.Label>
        </Form.Check>
        <Form.Check type="radio" id="sex" className="ms-3 mt-2 mb-3">
          <Form.Check.Input
            onChange={(event) => setSex(event.target.value)}
            type="radio"
            name="sex"
            value={"female"}
            isValid
          />
          <Form.Check.Label style={{ color: "black" }}>Femmina</Form.Check.Label>
        </Form.Check>
        <UniButton type={type} label={label}/>
      </Form>
    </Container>
  );
}
