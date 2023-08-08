import { PrismaClient } from "@prisma/client";
import cors = require("cors");
import express = require("express");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const name = req.body.name;
  const cost = req.body.cost;
  const category = req.body.category;

  const p = await prisma.games.create({
    data: {
      category,
      name,
      cost,
    },
  });

  console.log(p);
  res.send(p);
});

app.get("/getGames", async (req, res) => {

  console.log("get");
  
const p = await prisma.games.findMany({})  
res.send(p);
});



app.put("/edit", async (req, res) => {
  console.log("edit");
  try {
    const { idgames, name, cost, category } = req.body;

    const p = await prisma.games.update({
     
      data: {
        name,
        cost,
        category 
      },
      where: {
        idgames 
      }
    })
    res.send(p);
  } catch (err) {
    console.log(err);
  }
})

app.delete('/delete/:idgames', async (req,res)=> {
  console.log("delete");
const idgames = req.params.idgames;

const p = await prisma.games.delete({
  
  where: {
    idgames: Number(idgames)
  }

})
res.send(p);
})

app.listen(3001, () => {
  console.log("rodando servidor 3001");
});
