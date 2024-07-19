import { Router } from "express";
import cleanigDataBCV from "../controllesr/cleaningDataBCV.js";
import scrapingGetRawDataBCV from "../controllesr/scrapingGetRawDataBCV.js";
import setDollarsRateDataToFirebase from "../controllesr/setDollarsRateDataToFirebase.js";

const routes = Router();

routes.post("/upgrade-dollars-rate", async (req, res) => {
  const rawData = await scrapingGetRawDataBCV();

  if (!rawData.isSucces) {
    res.send({
      ...rawData,
    });
    return;
  }

  const clearData = cleanigDataBCV(rawData);
  const writeDataToDB = await setDollarsRateDataToFirebase(clearData);

  // console.log(rawData);

  res.send({
    message: "tasa del dollar actualizada",
    isSuccess: writeDataToDB,
  });
});

export default routes;
