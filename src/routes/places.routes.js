import { Router } from "express";
import depuradorDeRecervaGeneral from "../controllesr/depuradorDeRecervacionesGeneral.js";
import limpiarPuestosVencidosV2 from "../controllesr/limpiarPuestosVencidosV2.js";
const routes = Router();

routes.post("/limpiar-puestos-vencidos", depuradorDeRecervaGeneral);
routes.post("/v2/limpiar-puestos-vencidos", limpiarPuestosVencidosV2)

export default routes;
