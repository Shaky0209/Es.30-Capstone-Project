import React from 'react'
import { Col } from 'react-bootstrap'
import './UserCard.css';

export default function UserCard({image, name, surname, sex, birth, age, city, province, description, id }) {
  
  let user = localStorage.getItem("user");

  return (
    <Col  xxl={2} lg={3} md={4} xs={6} className='p-1'>
        <div className='card d-flex justify-content-between flex-column p-2 h-100'>
          <div>
            {sex === "male" ? <img  style={{width:"100%"}} src={image ? image : "https://tse1.mm.bing.net/th?id=OIP.Xwquh7b39vo0RocyWVTvuQHaHH&pid=Api"} alt="img" /> : 
              <img  style={{width:"100%"}} src={image ? image : "https://tse1.mm.bing.net/th?id=OIP.6UIGE50qpT7CH_CXfJuFNgAAAA&pid=Api"} alt="img" />}
            <p className='p-user m-0'><b>Nome:</b> {name} {surname}</p>
            <p className='p-user m-0'><b>Sesso:</b> {(sex === "male") ? "Maschio" : "Femmina"}</p>
            <p className='p-user m-0'><b>Età: </b>{age}</p>
            <p className='p-user m-0'><b>Nato/a: </b>{birth}</p>
            <p className='p-user m-0'><b>Città:</b> {city}</p>
            <p className='p-user m-0'><b>Provincia: </b> {province}</p>
            <p className='p-user m-0'><b>Qualcosa su di me:</b> {description}</p>
          </div>
          {(user === id) && <div>
            <button className="user-card-btn">Modifica</button>
          </div>}
        </div>
    </Col>
  )
}
