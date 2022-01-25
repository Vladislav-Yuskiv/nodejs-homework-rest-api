const express = require('express')
const { addContactValidation,
        updateContactValidation } = require('../../middlewares/validationMiddlewares')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
 
} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
   listContacts().then(contacts => {
      const parseContacts = JSON.parse(contacts)
        res.status(200).json({ contacts : parseContacts})
     })
})

router.get('/:contactId', async (req, res, next) => {
 
  getContactById(req.params.contactId).then(searchContact => {
    if (searchContact) {
      res.status(200).json({ searchContact })
    }
    else {
      res.status(404).json({ message : "Not found"})
    }
  })
  
})

router.post('/', addContactValidation ,async (req, res, next) => {

  addContact(req.body).then(contact => {
       res.status(201).json({ status: 'success' , contact })
  })
  
})

router.delete('/:contactId', async (req, res, next) => {

  removeContact(req.params.contactId).then(delatedContact => {
    if (delatedContact) {
      res.status(200).json({ message: 'contact deleted' })
    }
    else {
       res.status(404).json({ message: 'Not found' })
    }
  })

  

})

router.put('/:contactId', updateContactValidation , async (req, res, next) => {
  updateContact(req.params.contactId, req.body).then(updatedContact => {
    if (updatedContact) {
      res.status(200).json({ message: 'contact updated' , updatedContact })
    }
    else {
       res.status(404).json({ message: 'Not found' })
    }
  })

})

module.exports = router
