const mongoose=require('mongoose');

const contacts_schema=new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    number:
    {
        type: Number,
        required: true
    }
});

const contacts=mongoose.model('ContactsList',contacts_schema);
module.exports=contacts;