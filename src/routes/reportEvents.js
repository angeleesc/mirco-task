import { Router } from "express";
const routes = Router();

routes.get("/get-report/:eventId", (req, res) => {
  const { eventId } = req.params;

  const limit = 10;

  let hasMore = true;
  let next = null;

  //   calculamos el reporte total de ingreso por ventas de boletos

  let total = 0;
  let totalPorVendedor = {};
  let totalPorMetodoDePago = {};
  let totalPorTaquillaSede = {};
  let totalPorTipoDeEntrada = {};

  res.send({
    message: "exito",
  });
});

routes.post("/post-report", (req, res) => {
  console.log(req.body);

  console.log(req.body["angel sanches"]);

  res.send({ message: "exito" });
});

export default routes;
