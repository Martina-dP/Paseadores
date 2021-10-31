const { Router } = require("express");
const { User } = require("../db");
const bcryptjs = require("bcryptjs");

const router = Router();

router.put("/:token", async (req, res) => {
    const {password} = req.body
    const {token} = req.params
    console.log(token,password);
        if(!token || !password){
        res.status(400).send({message: "faltan datos"});
    }
    
    try{  
        const paseador = await User.findOne({
            where: {
                name: token
            }
        })

        let passwordHash = await bcryptjs.hash(password, 8);
        paseador.password = passwordHash
        const paseadorActualizado = await paseador.save()

        res.status(200).send("nueva contraseña");
    }catch{
        res.status(500).send("Ecurrió un error");
    }
});

module.exports = router;
