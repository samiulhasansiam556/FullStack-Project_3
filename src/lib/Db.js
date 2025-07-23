
import mongoose from 'mongoose';

const DBConnection = async () => {
  
  try{
 
      await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
      
      console.log("Database connected successfully");
  }catch(err){
      console.log(err);
      console.log("Database connection failed",err);
  }

}


export default DBConnection;