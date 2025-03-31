import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type : String,
        
    },
    phone:{
        type : String,
        required : [true,'Whatsapp number is required']
    },
    question1:{
        type : String
        
    },
    question2:{
        type : String
        
    },
    question3:{
        type : String
        
    },
},{
    timestamps : true
});


export const SurveyUser = mongoose.model("SurveyUser",userSchema);