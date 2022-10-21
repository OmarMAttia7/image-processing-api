function parseDimensions(widthInput: unknown, heightInput: unknown): {width: number, height: number} | false {
  if (typeof widthInput === "string" && typeof heightInput === "string") {
    // Parse width and height
    const widthInt = Number(widthInput);
    const heightInt = Number(heightInput);

    if(Number.isNaN(widthInt) || Number.isNaN(heightInt)){
      return false;
    }

    return {width: widthInt, height: heightInt};
  }else{
    return false;
  }
}

export default parseDimensions;