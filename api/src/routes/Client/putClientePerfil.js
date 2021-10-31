const { Router } = require("express");
const { Client } = require("../../db");

const router = Router();

router.put("/:id", async (req, res) => {
    const {id} = req.params
    const { description } = req.body
    
    try{  
        const cliente = await Client.findOne({
            where: {
                id: id
            }
        })
        description && (cliente.description = description)

        const clienteActualizado = await cliente.save()

        res.status(200).send(clienteActualizado);
    }catch{
        res.status(500).send("Ecurrió un error");
    }
});

module.exports = router;
