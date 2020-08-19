import React from "react";
import MD5 from 'object-hash';
// import _ from "lodash";

const data = require("../data/tech.yaml");

export default function Tech() {
  const renderCard = (cardData) => {
    return (
      <div className="col-lg-2 col-md-3 col-sm-4 col-xs-2">
        <div className="card" key={MD5(cardData)}>
          <div className="card-header">
            {cardData.title && <h4 className="card-title">{cardData.title}</h4>}
            {cardData.subtitle && (
              <h5 className="card-title">{cardData.subtitle}</h5>
            )}
          </div>
          <div className="requirements">-</div>
          <div className="card-body" />
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {data.map(renderCard)}
      </div>
    </div>
  );
}
