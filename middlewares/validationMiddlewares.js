const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
             
            name: Joi.string()
                    .alphanum() 
                    .min(3)
                    .max(30)
                    .required(),
            email: Joi.string()
                    .min(5)
                    .max(80)
                    .required(),
            
            phone: Joi.string()
                    .min(7)
                    .max(20)
                    .required()
    });

     const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
          return res.status(400).json({message : "missing required name field"})
      }
  
        next()
    },
    updateContactValidation: (req, res, next) => {
         const schema = Joi.object({
             
            name: Joi.string()
                    .alphanum() 
                    .min(3)
                    .max(30)
                    .optional()
                 .required(),
             
            email: Joi.string()
                    .min(5)
                    .max(80)
                    .optional()
                    .required(),
            
            phone: Joi.string()
                    .min(7)
                    .max(20)
                    .optional()
                    .required(),
         });
        
        const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
          return res.status(400).json({message :  "missing fields"})
      }
  
        next()
     },
}