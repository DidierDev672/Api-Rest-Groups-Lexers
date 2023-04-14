const router = require("express").Router();
const customer = require("../postgres");


router.get("/", async (req, res) => {
    await customer.query('SELECT * FROM section')
    .then((response) => {
        res.json(response.rows);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Code: ", errorCode);
        console.log("Message: ", errorMessage);
    });
});

router.get("/:code", async (req, res) => {
    const { code } = req.params;
    const query = await customer.query('SELECT * FROM section WHERE codigo = $1', [code]);

    if(query){
        res.json(query.rows);
    }else{
        res.status(404).end();
    }
});

router.post("/", async (req, res) => {
    const { code, name, budget } = req.body;

    console.log({ code, name, budget });

    await customer.query('INSERT INTO section (codigo, nombre, presupuesto) VALUES ($1,$2,$3)',[code,name,budget])
    .then(() => {
        res.json({
            message: "Section added Successfully",
            body:{
                section:{
                    code,
                    name,
                    budget
                }
            }
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Code: ", errorCode);
        console.log("Message: ", errorMessage);
    })
});


router.delete("/:code", async (req, res) => {
   const { code } = req.params;

   await customer.query('DELETE FROM section WHERE codigo = $1', [code])
   .then((result) => {
    if(result.rowCount > 0){
        res.json({message: `Section ${code} deleted successfully` });
    }else{
        res.json({ message: `${code} The data you want to update does not exist`});
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
    const { name, budget } = req.body;

    await customer.query("UPDATE section SET nombre = $1, presupuesto = $2 WHERE codigo = $3", [name, budget, code])
    .then((result) => {
        if(result.rowCount > 0){
            res.json({message: `Section updated successfully`});
        }else{
            res.json({ message: `${code} The data you want to update does not exist`});
        }
    });
});

module.exports = router;