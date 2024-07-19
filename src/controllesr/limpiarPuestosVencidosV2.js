import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firebase/firebase.cjs";

export default async function limpiarPuestosVencidosV2(req, res) {
  const { eventId } = req.body;

  const limit = 10;
  let hasMore = true;
  let next = null;

  while (hasMore) {
    let reservationQuery = db
      .collection("events")
      .doc(eventId)
      .collection("recervations")
      .orderBy("expirationTime");
    if (next) reservationQuery = reservationQuery.startAfter(next);
    reservationQuery = reservationQuery.limit(limit);
    const result = await reservationQuery.get();
    if (!result.empty) {
        for (let place of result.docs) {
            const {
                generalPlaceRecerved,
                placeRecerve,
                reservatioId,
                reservationId,
            } = place.data();

            try {
                // obtenemos los primeros query
                await db.runTransaction(async (t) => {

                    const placeDatatoUpdate = db.collection('events').doc(eventId).collection()

                    if (generalPlaceRecerved) {
                      console.log("tipo de puesto: general");
                      const recervationsQuery = db
                        .collection("transferPending")
                        .where(
                          "generalPlaceDataForCheckout.generalRecervationId",
                          "==",
                          reservatioId
                        )
                        .limit(1);
                      const result = await recervationsQuery.get();
                      if (result.empty) {
                        console.log("libre");
                      } else {
                        console.log("---------pago---------");
                      }
                    }
                
                    if (placeRecerve) {
                      console.log("tipo de puesto: silla");
                      const placeRecervationQuery = db
                        .collection("transferPending")
                        .where(
                          "placeRecervedForCheckout.reservatioId",
                          "==",
                          reservationId
                        );
                      const placeResult = await placeRecervationQuery.get();
                
                      if (placeResult.empty) {
                        console.log("libre");
                      } else {
                        console.log("---------------recervado----------------");
                      }
                    }
                    
              });
            } catch (error) {
              console.log("ocurrio un error");
              console.log(error);
              hasMore = false;
            }
            
        }
    }
    
    if (result.docs.length < limit) {
        console.log("despues de esto no hay resultado");
        hasMore = false;
    } else {
        next = result.docs[result.docs.length - 1];
        console.log("aun hay datos por eliminar");
        console.log(next.id);
    }
    
 
  }

  res.send({
    message: "exito toda las recervaciones vencidas",
  });
}
