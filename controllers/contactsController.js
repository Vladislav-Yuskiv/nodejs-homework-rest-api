const {
    getContacts,
    addContact,
    deleteContact,
    getContactById,
    updateContact,
    updateStatusContact
} = require('../services/contactService')

const getContactsController = async (req, res) => {

  const { _id: userId } = req.user;
  
  console.log(userId);
  const contacts =  await getContacts(userId)
    
  res.status(200).json({ contacts })

}

const getContactByIdController = async (req, res) => {

  const { _id: userId } = req.user;

  const contact = await getContactById(req.params.contactId, userId)
  
     res.status(200).json({ contact })
    
}

const addContactController = async (req, res) => {

  const { _id: userId } = req.user; 

  const newContact = await addContact(req.body , userId)

  res.status(201).json({ status: 'success' , newContact })
   
   
}

const updateContactController = async (req, res) => {

    const { _id: userId } = req.user; 

    const updatedContact = await updateContact(req.params.contactId , req.body , userId)

    if (updatedContact) {
      res.status(200).json({ message: 'contact updated' , updatedContact })
    }
    else {
       res.status(404).json({ message: 'Not found' })
    }
    
}

const removeContactController = async (req, res) => {

    const { _id: userId } = req.user; 
    
    await deleteContact(req.params.contactId , userId)
    res.json({status: 'success'});
}

const updateStatusContactController = async (req, res) => {


  const { _id: userId } = req.user; 

  const updatedContact = await updateStatusContact(req.params.contactId, req.body , userId)

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