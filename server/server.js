const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Address = require('./model/model');

const cors = require('cors');

app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/AddressBook', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=> {
    console.log('connected to db');
}).catch((error)=>{
    console.log(error);
})



app.get('/address/all', (request, response) => {

    Address.find({}, (error, addresses) => {
        if(!error) response.json(addresses);

    });
});

Address.findOneAndUpdate({_id: "6374df8eb4de2cc558dc1a88"}, {name: "bappy"}, (err, address) => {
    if(!err){
        console.log(address);
    }
})
app.put('/address/:id', (request, response) => {
    let name = request.body.name;
    let phone = request.body.phone;
    let place = request.body.place;

    Address.findOneAndUpdate({_id: request.params.id}, {name: name, phone: phone, place: place}, {returnOriginal: true}, (err, address) => {
        if(!err){
            response.json(address);
        }
    })

});
app.delete('/address/:id', (request, response) => {
    console.log('entered');
    Address.findByIdAndDelete(request.params.id,(err, address) => {
        if(!err){
            response.json(address);
        }
    })


});


app.post('/address/add-record', (request, response) => {
    console.log(request.body.name);
    let name = request.body.name;
    let phone = request.body.phone;
    let place = request.body.place;
    let newAddress = new Address({
        name: name,
        phone: phone,
        place: place,
    });

    newAddress.save().then((address) => {
        response.json(address);
    }).catch((err)=>{
        console.log(err);
    })
});


app.listen(3000, () => {
    console.log('server is running at ' + 3000);
});