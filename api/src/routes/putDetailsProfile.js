const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.put("/:id", async (req, res) => {
    const {id} = req.params
    const {status, price, description} = req.body
    
    
    try{  
        const paseador = await User.findOne({
            where: {
                id: id
            }
        })
        status && (paseador.status = status)
        price && (paseador.price = price)
        description && (paseador.description = description)

        const paseadorActualizado = await paseador.save()

        res.status(200).send(paseadorActualizado);
    }catch{
        res.status(500).send("Ecurrió un error");
    }
});

module.exports = router;
