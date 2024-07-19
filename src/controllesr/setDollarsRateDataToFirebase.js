import { db } from "../firebase/firebase.cjs";

const setDollarsRateDataToFirebase = async (clearData) => {
  const { isSucces, message, clearNumber } = clearData;

  const utilRef = db.collection("utils").doc("dollar");
  console.log("clear number ", clearNumber);
  console.log("clear data ", clearData);

  const dataToUpdate = {
    tasa: clearNumber,
    isSucces: isSucces ? true : false,
  };

  try {
    await utilRef.update(dataToUpdate);
    return { isSucces: true };
  } catch (error) {
    console.log(error);
    return { isSucces: false };
  }
};

export default setDollarsRateDataToFirebase;
