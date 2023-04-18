const Router = require("express");
const router = Router();
const Employee = require("../Models/Employee");

router.get("/", async (req, res) => {
    try{
        await Employee.findAll()
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return res.status(500).json({ message: errorMessage });
        });
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log("------------------------------------");
        console.log(errorMessage);
        console.log("-------------------------------------");
        return res.status(500).json({ message: errorMessage });
    }
});

router.get("/:code", async (req, res) => {
    const { code } = req.params;

    await Employee.findOne({ where: { code: code } })
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log("--------------------------------------------------------");
        console.log(errorMessage);
        console.log("---------------------------------------------------------");
        return res.status(500).json({ message: errorMessage });
    });
});

router.post("/", async (req, res) => {
    const { code,nif, name, last_name1, last_name2, code_section } = req.body;

    try{
        const newEmployee = await Employee.create({
            code,
            nif,
            name,
            last_name1,
            last_name2,
            code_section,
        });

        const now = new Date();

        newEmployee.createdAt = now;
        newEmployee.updatedAt = now;

        newEmployee.save()
        .then(() => {
            console.log("Employee successfully created");
            return res.status(200).json({ message: "Employee successfully created" });
        })
        .catch((error) => {
            console.log("Error when creating employee: ", error.message);
            return res.status(500).json({ message: error.message });
        })
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return res.status(500).json({ message: errorMessage });
    }
});

router.put("/:code", async (req, res) =>{
    const { code } = req.params;
    const { nif, name, last_name1, last_name2, code_section } = req.body;

    await Employee.update({ nif, name, last_name1, last_name2, code_section }, { where: { code: code } })
    .then((result) => {
        return res.status(200).json(result);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log("------------------------------------");
        console.log(errorMessage);
        console.log("-------------------------------------");
        return res.status(500).json({ message: errorMessage });
    });
});

router.delete("/:code", async (req, res) => {
    const { code } = req.params;

    try{
        await Employee.destroy({ where: { code: code } })
        .then((result) => {
            console.log("Record successfully deleted");
            return res.status(200).json({ message: "Record successfully deleted: ", result });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log("----------------------------------------------------------------------");
            console.log(errorMessage);
            console.log("-----------------------------------------------------------------------");
            return res.status(500).json({ message: errorMessage });
        })
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log("---------------------------------------------");
        console.log(errorMessage);
        console.log("-----------------------------------------------");
        return res.status(500).json({ message: errorMessage });
    }
});

module.exports = router;