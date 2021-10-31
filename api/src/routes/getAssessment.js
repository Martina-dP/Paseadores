const { Router } = require("express");
const router = Router();
const { User, Client, User_client} = require('../db');


router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    
   try {
       
    const user = await User_client.findAll({
        where: { userId: id },
      });
  //console.log(user[0].comment)
  const scores = user.filter((t) => t.score)
  if(scores){
  const cantScores = scores.map((t) => t.score)
    let acumScores= 0;
  for(let i=0; i < cantScores.length; i++){
    acumScores = acumScores + cantScores[i]
  }
  
  const score = acumScores/ cantScores.length
  
  
  
  const commentsClients = user.filter((t) => t.comment)
  const comment = commentsClients.map((t) => t.comment)

  
      //const favo = f?.map(t => t.user_client.userId)

      res.json({score, comment})

}else(res.json({score:0, comment:[]}))
          
    }catch(error){
        next(error)
    }
})

module.exports = router;