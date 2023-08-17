import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';


async function handler(req, res) {
    if (req.method !== 'POST') {
      return;
    }
    const { email, password } = req.body;
    console.log(email, password);
    if (
      
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 5
    ) {
      res.status(422).json({
        message: 'Validation error',
      });
      return;
    }
  
    await db.connect();
    const user = await User.findOne({
        email:email,
      });
      await db.disconnect();
      if (user && bcryptjs.compareSync(password, user.password)) {
        res.status(201).send({
            message: ' user! data',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
      }
    
 
  
   
 
  }
  
  export default handler;