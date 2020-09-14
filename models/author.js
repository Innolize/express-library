const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        surname: { type: String, required: true, maxlength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date }
    }
)

//Virtual for author-s full name

AuthorSchema
    .virtual('name')
    .get(() => {


        // To avoid Errors in cases where an author does not have either a surname or first name
        // we want to make sure we handle the exception by returning an empty string for that case

        let fullname = ''
        if (this.first_name && this.surname) {
            fullname = this.surname + ", " + this.first_name
        }
        if (!this.first_name || !this.surname) {
            fullname = ''
        }


        return fullname
    })

//Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(() => {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
    })


//Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(() => {
        return '/catalog/author/' + this._id
    })

//Export model
module.exports = mongoose.model('Author', AuthorSchema)





