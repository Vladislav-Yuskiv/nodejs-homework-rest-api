const { Contact } = require('../db/contactModel');
const {NotFoundError} = require('../helpers/error')

const getContacts = async (userId) => {
    const contacts = await Contact.find({owner : userId})

    return contacts
}

const getContactById = async (contactId , userId) => {
    const contact = await Contact.findOne({_id: contactId, owner : userId})

    if (!contact) {
        throw new NotFoundError('Not found contact')
    }

    return contact
}

const addContact = async (body , userId) => {
const {
    name,
    email,
    phone,
    favorite
    } = body;

    const contact = new Contact({ name, email, phone, favorite , owner: userId})
    await contact.save()

    return contact
}

const updateContact = async (contactId, {name, email ,phone , favorite } , userId) => {

   const updatedContact =  await Contact.findOneAndUpdate(
      {_id: contactId , owner: userId },
      {$set: {name, email ,phone , favorite }}
    );
    
    return updatedContact

}

const deleteContact = async (contactId , userId) => {

  await Contact.findOneAndRemove({_id: contactId ,  owner: userId}); 
    
}

const updateStatusContact = async (contactId , {favorite} , userId) => {

 const contact = await Contact.findOneAndUpdate(
      {_id: contactId ,  owner: userId},
      {$set: { favorite }}
    );
     
    return contact
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    updateStatusContact
}