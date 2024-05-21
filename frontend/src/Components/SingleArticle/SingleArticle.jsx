import React from 'react';
import Col from 'react-bootstrap/Col';
import './SingleArticle.css';

export default function SingleArticle({id, img, category, title, description, city, province, contact, user, posted}) {

  return (
    <Col xs={10} sm={5} md={4} lg={3} xl={2} className='my-1 px-1'>
        <div className='card-art p-1 h-100'>
            <img style={{width:"100%"}} src={`${img || "https://www.slgstore.it/media/catalog/product/placeholder/default/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image.jpg"}`} alt="img" />
            <p className="article-row mb-0">{category}</p>
            <p className="article-row mb-0">{title}</p>
            <p className="article-row mb-0">{description}</p>
            <p className="article-row mb-0">{city}</p>
            <p className="article-row mb-0">{province}</p>
            <p className="article-row mb-0">{contact}</p>
            <p className="article-row mb-0">{user}</p>
            <p className="article-row mb-0">{id}</p>
            <p className="article-row mb-0">{posted}</p>
        </div>
    </Col>
  )
}
