import { db } from "../firebase/firebase.cjs";
import { customAlphabet } from "nanoid";
import { FieldValue } from "firebase-admin/firestore"

const addRamdonNumber = async (eventId) => {
  console.log("agregando numeros aleatorioas");

  const nanoid = customAlphabet("1234567890", 10);

  let hasMore = true;
  let next = null;
  let limit = 200;
  let nowWait = 0;

  while (hasMore) {
    let waitQueueRef = db
      .collection("events")
      .doc(eventId)
      .collection("waiting-queue")
      .orderBy("waitUser");
    if (next) waitQueueRef = waitQueueRef.startAfter(next);
    waitQueueRef = waitQueueRef.limit(limit);

    try {
      await db.runTransaction(async (t) => {
        const waitingUserResult = await t.get(waitQueueRef);

        if (!waitingUserResult.empty) {
          for (let userToWait of waitingUserResult.docs) {
            const ramdonTurn = nanoid(10);
            nowWait += 1;

            const userToUpdateRef = db
              .collection("events")
              .doc(eventId)
              .collection("waiting-queue")
              .doc(userToWait.id);

            t.update(userToUpdateRef, {
              ramdonTurn: Number(ramdonTurn),
              waitUser: FieldValue.delete()
            });
          }
        } else {
          hasMore = false;
          console.log("sin resultado");
        }

        if (waitingUserResult.docs.length < limit) {
          hasMore = false;
          console.log("despues de esto no hay mas");
        } else {
          next = waitingUserResult.docs[waitingUserResult.docs.length - 1];
          console.log("aun queda mas");
        //   console.log(next.data().userId);
        }
      });
    } catch (error) {
        console.log('ocurrio un error')
      hasMore = false;
    }
    // hasMore = false;
  }

  console.log("actualmente en espera : ", nowWait);
};

export default addRamdonNumber;
