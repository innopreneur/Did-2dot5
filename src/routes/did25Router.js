/**
 * router to handle all did25 related routes
 */
import express from 'express';
import Did25 from '../api/did25';


const did25Router = express.Router();
const did25 = new Did25();


const redirect_uri = "http://localhost:4000/callback?scope=user-read-private%20user-read-email&state=34fFs29kd09";

did25Router.post('/login',(req, res, next) => {
      try{
          console.log(req.body)
          let loginSuccessful = did25.login(req.body.username, req.body.password);
          
          if(loginSuccessful){
            return res.status(200).json({message : "Success"});
          }
          else {
            return res.status(401).json({message : "Authentication failed"});
          }
 
      }
      catch(error){
        next(new Error(error));
      }  
 
  });
  
did25Router.post('/signup', async (req, res, next) => {
    try{
        let result = await did25.signup(req.body.username, req.body.password);
        return res.status(201).json(result);
    }
    catch(error){
      next(new Error(error));
    }  

});

did25Router.post('/reset', async (req, res, next) => {
  try{
      let result = await did25.resetCredentials(req.body.seed, req.body.username, req.body.password);
      if(result){
        return res.status(201).json(result);
      }
      else {
        return res.status(401).json({message : "Authentication failed"});
      }  
  }
  catch(error){
    next(new Error(error));
  }  

});

export default did25Router;
