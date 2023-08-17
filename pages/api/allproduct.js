import Product from "../../models/Product";
import db from "../../utils/db";

const handler= async (req,res)=>{
await db.connect()

const response =  await Product.find({});
res.send(response)


}
export default handler;