import React from "react";
import "./card.css";
import FormDialog from "../Dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        idgames={props.idgames}
        name={props.name}
        cost={props.cost}
        category={props.category}
        listCard={props.listCard}
        setListCard={props.setListCard}
      />
      <div className="card-container" onClick={() => handleClickCard()}>
        <h1 className="card-title">{props.name}</h1>
        <p className="card-cost">{props.cost}</p>
        <p className="card-category">{props.category}</p>
      </div>
    </>
  );
}
