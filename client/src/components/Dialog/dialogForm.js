import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { apiGames } from "../../services/api";

export default function FormDialog(props) {
  const [nameEdit, setNameEdit] = useState(props.name);
  const [costEdit, setCostEdit] = useState(props.cost);
  const [categoryEdit, setCategoryEdit] = useState(props.category);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    console.log({ nameEdit, costEdit, categoryEdit });
    console.log(props.idgames);
    apiGames
      .put("/edit", {
        idgames: props.idgames,
        name: nameEdit,
        cost: costEdit,
        category: categoryEdit,
      })
      .then((response) => {
        const games = props.listCard.map((e) => {
          if (e.idgames === props.idgames) {
            e.name = nameEdit;
            e.cost = costEdit;
            e.category = categoryEdit;
          }
          return e;
        });
        console.log(games);
        props.setListCard(games);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        handleClose();
      });
  };

  const handleDelete = () => {
    apiGames
      .delete(`/delete/${props.idgames}`)
      .then((response) => {
        const newGames = props.listCard.filter(
          (e) => e.idgames !== props.idgames
        );
        props.setListCard(newGames);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          defaultValue={props.name}
          id="name"
          label="Nome do jogo"
          onChange={(e) => setNameEdit(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          onChange={(e) => setCostEdit(e.target.value)}
          defaultValue={props.cost}
          id="cost"
          label="Preço"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          onChange={(e) => setCategoryEdit(e.target.value)}
          defaultValue={props.category}
          id="category"
          label="Categoria"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Excluir</Button>
        <Button onClick={handleEditGame}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
