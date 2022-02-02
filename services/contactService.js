const { Contact } = require('../db/contactModel');
const {NotFoundError} = require('../helpers/error')

const getContacts = async () => {
    const contacts = await Contact.find({})

    return contacts
}

const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId)

    if (!contact) {
        throw new NotFoundError('Not found contact')
    }

    return contact
}

const addContact = async (body) => {
const {
    name,
    email,
    phone,
    favorite
    } = body;

    const contact = new Contact({ name, email, phone, favorite })
    await contact.save()

    return contact
}

const updateContact = async (contactId, {name, email ,phone , favorite } ) => {

   const updatedContact =  await Contact.findOneAndUpdate(
      {_id: contactId },
      {$set: {name, email ,phone , favorite }}
    );
    
    return updatedContact

}

const deleteContact = async (contactId) => {

  await Contact.findOneAndRemove({_id: contactId}); 
    
}

const updateStatusContact = async (contactId , {favorite}) => {

 const contact = await Contact.findOneAndUpdate(
      {_id: contactId },
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