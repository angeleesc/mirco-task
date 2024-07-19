import { db } from "../firebase/firebase.cjs";
import { FieldValue } from "firebase-admin/firestore";

export default async function depurardorDeRecevacionesVencidas(
  eventID,
  placesId
) {
  console.log("depurado XD");

  const now = new Date();

  const placesQueryRef = db
    .collection("events")
    .doc(eventID)
    .collection(placesId)
    .where("expirationTime", "<=", now)
    .orderBy("expirationTime");
  
  

  const expiratedPlaceRef = db
    .collection("events")
    .doc(eventID)
    .collection(placesId);

  let hasmore = true;
  let referencia;

  try {
    while (hasmore) {
      await db.runTransaction(async (t) => {
        console.log("obteniendo puesto vencidos");

        if (referencia) {
        }

        const expirationPlaceResult = await t.get(placesQueryRef.limit(10));
        if (expirationPlaceResult.empty) {
          hasmore = false;
          console.log("los puesta estan ok");
        } else {
          console.log("tiene puesto vencido");
          const baseExpiratePlaces = expirationPlaceResult.docs;
          for (let expiradetPlace of baseExpiratePlaces) {


              // const transferPeddingRef = 

              // verificamo si no esta en la colecion de tranferencia pendiente tomando como referencia el su recervacion id

              // si es traquer e



            console.table(expiradetPlace.data());
            t.update(expiratedPlaceRef.doc(expiradetPlace.id), {
              expirationTime: FieldValue.delete(),
              reservatioId: FieldValue.delete(),
              estado: "ok",
            });

        

          }

          if (baseExpiratePlaces.length < 10) {
            console.log("despues de este loste no hay mas");
            hasmore = false;
          } else {
            console.log("todavia queda mucho mas");
          }
        }
      });
    }
  } catch (error) {}
}
