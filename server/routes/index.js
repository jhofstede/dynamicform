const express = require("express");
const router = express.Router();

const layout = require("../data/layout");
const schema = require("../data/schema");
const FormValidation = require("../../src/utils/formValidation");

router.get("/api/schema", (req, res) => {
  res.send(schema);
});
router.get("/api/layout", (req, res) => {
  res.send(layout);
});
router.post("/api/form", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const validationResult = FormValidation(schema.fields, req.body);
  if (validationResult.schemaErrors.length > 0) {
    res
      .status(401)
      .send({ result: "error", error: {}, message: validationResult.schemaErrors}); 
  } else 
  if (validationResult && validationResult.valid === true) {
    // Implement insert/update functionality here....
    res.status(201).send({ result: "ok" });
  } else {
    res
      .status(422)
      .send({ result: "error", error: validationResult.fieldResults });
  }
});
module.exports = router;
