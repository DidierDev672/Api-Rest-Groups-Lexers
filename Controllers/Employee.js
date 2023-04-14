const router = require("express").Router();
const client = require("../postgres");


// define the home page route
router.get("/", async (req, res) => {
  await client
    .query("SELECT * FROM employee")
    .then((response) => {
      res.json(response.rows);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Code: ", errorCode);
      console.log("Name error: ", errorMessage);
    });
});
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const query = await client.query("SELECT * FROM employee WHERE codigo = $1", [
    code,
  ])
  if (query) {
    res.json(query.rows);
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  const { code, nif, name, last_name_1, last_name_2, code_section } =
    req.body;

  if (nif.length > 9) {
    res.json({message:"You are exceeding the character limit"});
  }

  if(code.length > 10){
    res.json({ message:"You are exceeding the 4 digit limit of 10 numbers example: '0000'"});
  }

  await client
    .query(
      `INSERT INTO employee (codigo,nif,nombre,apellido_1,apellido_2,codigo_departamento) VALUES ($1,$2,$3,$4,$5,$6)`,
      [code, nif, name, last_name_1, last_name_2, code_section]
    )
    .then(() => {
      res.json({
        message: "Employee Added Successfully",
        body: {
          employee: {
            code,
            nif,
            name,
            last_name_1,
            last_name_2,
            code_section,
          },
        },
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Code: ",errorCode);
      console.log("Message: ",errorMessage);
    });

});

router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  await client.query("DELETE FROM employee WHERE codigo = $1", [code])
  .then((result) => {
    if(result.rowCount > 0){
      res.json(`Employee ${code} deleted successfully`);
    }else{
      res.json(`${code} The data you want to delete with exist`);
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Code: ", errorCode);
    console.log("Message: ", errorMessage);
  });

  res.status(204).end();
});

router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { nif, name, last_name_1, last_name_2, code_section } = req.body;

  await client.query(
    "UPDATE employee SET nif = $1, nombre = $2, apellido_1 = $3, apellido_2 = $4, codigo_departamento = $5 WHERE codigo = $6",
    [nif, name, last_name_1, last_name_2, code_section, code]
  )
  .then((result) => {
    if(result.rowCount > 0){
      res.json({message: `Employee updated successfully`});
    }else{
      res.json({ message: `${code} The data you want to update does not exist`});
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});


module.exports = router;
