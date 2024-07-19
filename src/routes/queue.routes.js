import { Router } from "express";
import addRamdonNumber from "../controllesr/addRamdonNumber.js";
import addTrun from "../controllesr/addTrun.js";
const routes = Router();

routes.post("/add-random-trun", async (req, res) => {
  const { eventId } = req.body;

  console.log(eventId);
  // 1. añadimos numreos aleatorios de rango rande para disminuir pa probabilidad de repeticiones,
  await addRamdonNumber(eventId);
  await addTrun(eventId);

  res.send({ message: "nuemros añadidos XD" });
});

export default routes;
