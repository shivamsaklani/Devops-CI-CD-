import {database} from "@repo/prismadb/database";
import express from "express";

const app = express();

app.use(express.json());

app.get("/" , (req,res)=>{
    res.json({
    data :"running"
    });
})

app.post("/signup",async(req,res)=>{
    const {name} = req.body;
    console.log(name);
    await database.user.create({
        data:{
            name:name
        }
    })
    res.send(name +"created");
})


app.listen(3001);
