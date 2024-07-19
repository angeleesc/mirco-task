const cleanigDataBCV = (rawData) => {
  if (rawData.number) {
    const extarctUSD = /(USD)/g;
    const usd = rawData.content.match(extarctUSD);
    const extractNumber = /[0-9]+([,][0-9]+)/;
    let number = rawData.number.match(extractNumber);
    const number2 = rawData.content.match(extractNumber);

    // console.log("number", number[0]);
    // console.log("number 2", number2[0]);

    const clearNumber = Number(number2[0].replace(",", ".")).toFixed(2);
    // console.log("clearnumber", clearNumber);

    return { isSucces: true, clearNumber, message: "exito XD" };
  } else {
    return {
      isSucces: false,
      message:
        "lo siento pero durante la extracion del escraping no aparece el numeros",
    };
  }
};

export default cleanigDataBCV;
