import { db } from "../firebase/firebase.cjs";

const addTrun = async (eventId) => {
  let hasMore = true;
  let next = null;
  let limit = 200;

  console.log("asignando numero");

  while (hasMore) {
    try {
      let waitQueueQuery = db
        .collection("events")
        .doc(eventId)
        .collection("waiting-queue")
        .orderBy("ramdonTurn");
      if (next) waitQueueQuery = waitQueueQuery.startAfter(next);
      waitQueueQuery = waitQueueQuery.limit(limit);

      const currecntWaitRef = db
        .collection("events")
        .doc(eventId)
        .collection("utils")
        .doc("currentTurn");

      await db.runTransaction(async (t) => {
        const currentUserWait = (await t.get(currecntWaitRef)).data();
        let currentTurn = currentUserWait.currentTurn;

        const usersResults = await t.get(waitQueueQuery);
        if (!usersResults.empty) {
          for (let userWaiit of usersResults.docs) {
            currentTurn += 1;

            const userToAddTurn = db
              .collection("events")
              .doc(eventId)
              .collection("waiting-queue")
              .doc(userWaiit.id);

            t.update(userToAddTurn, {
              turn: currentTurn,
            });
          }
        } else {
          hasMore = false;
          console.log("no hay resultado");
        }

        if (usersResults.docs.length < limit) {
          hasMore = false;
          console.log("no hay datos");
        } else {
          next = usersResults.docs[usersResults.docs.length - 1];
          console.log("aun queda mas");
          console.log(next.id);
        }

        t.update(currecntWaitRef, { currentTurn });
      });
    } catch (error) {
      hasMore = false;
    }
  }
};

export default addTrun;
