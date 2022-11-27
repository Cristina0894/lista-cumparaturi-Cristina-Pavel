const mongoose = require('mongoose')
const slugify = require('slugify')
const itemSchema = new mongoose.Schema({
    
    titlu:{
        type: String,
        required: true
    },
    detalii:{
        type: String
    },
    slug:{
        type: String,
        required:true,
        unique: true
    },
    bifat:{
        type: String
    }
    
})

itemSchema.pre('validate', function(next) {
    if(this.titlu){
        this.slug = slugify(this.titlu, { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Item', itemSchema)