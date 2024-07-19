import { db } from "../firebase/firebase.cjs";
import depurardorDeRecevacionesVencidas from "./eliminarPuestos.js";

const depuradorDeRecervaGeneral = async (req, res) => {
  const limit = 10;

  let hasMore = true;
  let next = null;

  while (hasMore) {
    let eventQuery = db.collection("events").orderBy("date");
    if (next) eventQuery = eventQuery.startAfter(next);
    eventQuery = eventQuery.limit(limit);

    const eventResult = await eventQuery.get();

    if (!eventResult.empty) {
      for (let event of eventResult.docs) {
        // console.log(event.data());
        await depurardorDeRecevacionesVencidas(event.id, "chairs");
        await depurardorDeRecevacionesVencidas(event.id, "general-place");
        await depurardorDeRecevacionesVencidas(event.id, "chairs-controls");
      }
    } else {
      hasMore = false;
    }

    if (eventResult.docs.length < limit) {
      hasMore = false;
      console.log("ya no hay mas eventos que duprar");
    } else {
      next = eventResult.docs[eventResult.docs.length - 1];
      console.log("aun queda evenntos por limpiar");
    }

    // hasMore = false;
  }

  res.send({ message: "exito" });
};

export default depuradorDeRecervaGeneral;
