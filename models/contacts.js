const fs = require('fs').promises;
const path = require('path'); 

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {

  return fs.readFile(contactsPath, 'utf8')
}

const getContactById = async (contactId) => {

  return fs.readFile(contactsPath, 'utf8').then(contacts => {
    const parseContacts = JSON.parse(contacts)    
    const [contact] = parseContacts.filter(contact => Number(contact.id) === Number(contactId)) 
    return contact

  })

}

const removeContact = async (contactId) => {

   return fs.readFile(contactsPath, 'utf8').then(contacts => {
     const parseContacts = JSON.parse(contacts)

     const index = parseContacts.findIndex(
          (contact) => Number(contact.id) === Number(contactId)
     );
     if (index !== -1) {
        const updateContacts = parseContacts.filter(contact => Number(contact.id) !== Number(contactId)) 
        fs.writeFile(contactsPath , JSON.stringify(updateContacts))
        return parseContacts[index]

     }
  
       
  })
}

const addContact = async (body) => {
  const {
    name,
    email,
    phone
  } = body;

  
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone
  }
  

 return  fs.readFile(contactsPath, 'utf8').then(contacts => {
    const parseContacts = JSON.parse(contacts)    
    const newArrayOfContacts = [...parseContacts, newContact]
   
    fs.writeFile(contactsPath , JSON.stringify(newArrayOfContacts))
    return newContact

  })
  

}

const updateContact = async (contactId, body) => {

   return fs.readFile(contactsPath, 'utf8').then(contacts => {
     const parseContacts = JSON.parse(contacts)

       const index = parseContacts.findIndex(
          (contact) => Number(contact.id) === Number(contactId)
     );
     if (index !== -1) {
        parseContacts[index] = { ...parseContacts[index], ...body };
     
       fs.writeFile(contactsPath, JSON.stringify(parseContacts))
       
        return  parseContacts[index]

     }
  
       
  })


}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
