const {
    getContacts,
    addContact,
    deleteContact,
    getContactById,
    updateContact,
    updateStatusContact
} = require('../services/contactService')

const getContactsController = async (req, res) => {
    const contacts =  await getContacts()
    
    res.status(200).json({ contacts })
}

const getContactByIdController = async (req, res) => {
    const contact = await getContactById(req.params.contactId)
     res.status(200).json({ contact })
    
}

const addContactController = async (req, res) => {

  const newContact = await addContact(req.body)

  res.status(201).json({ status: 'success' , newContact })
   
   
}

const updateContactController = async (req, res) => {

    const updatedContact = await updateContact(req.params.contactId , req.body)

    if (updatedContact) {
      res.status(200).json({ message: 'contact updated' , updatedContact })
    }
    else {
       res.status(404).json({ message: 'Not found' })
    }
    
}

const removeContactController = async (req, res) => {

    await deleteContact(req.params.contactId)
    res.json({status: 'success'});
}

const updateStatusContactController = async (req, res) => {
  const updatedContact = await updateStatusContact(req.params.contactId, req.body)

    if (updatedContact) {
      res.status(200).json({ message: 'contact updated' , updatedContact })
    }
    else {
       res.status(404).json({ message: 'Not found' })
    }
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    updateContactController,
    removeContactController,
    updateStatusContactController
    
}