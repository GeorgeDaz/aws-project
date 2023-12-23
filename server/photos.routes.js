const { Router } = require("express");
const { UploadFile, readData } = require("./s3");

const router = Router();

router.get("/", (req, res) => res.send("Welcome"));
router.post("/upload", async (req, res) => {
  console.log(req.files["photo"]);
  const result = await UploadFile(req.files["photo"]);
  console.log(result);

  res.send("Archivo subido");
});

router.get("/archivo/:fileName", async (req, res) => {
  try {
    const result = await readData(req.params.fileName);
    console.log(result);
    res.send("Archivo Descargado");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
