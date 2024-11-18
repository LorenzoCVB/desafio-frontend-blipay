import React from "react";
import DataItem from "./DataItem";
import person_icon from "../assets/person.png";
import calendar_icon from "../assets/calendar.png";
import coin_icon from "../assets/coin.png";
import city_icon from "../assets/city.png";
import id_icon from "../assets/id-card.png";

const HistoryCard = ({ formData }) => (
  <div className="history-card">
    <div className="account-type">
      <strong>Tipo de Conta:</strong> {formData.accountType}
    </div>
    <div className="data">
      <DataItem icon={person_icon} label={formData.name} />
      {formData.age && (
        <DataItem icon={calendar_icon} label={`${formData.age} anos`} />
      )}
      <DataItem icon={id_icon} label={formData.document} />
      <DataItem icon={coin_icon} label={`R$${formData.income}`} />
      <DataItem icon={city_icon} label={formData.city} />
    </div>
  </div>
);

export default HistoryCard;
