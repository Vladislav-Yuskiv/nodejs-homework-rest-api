const Joi = require('joi');

const {ValidationError , WrongParametersError} = require('../helpers/error')

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
             
            name: Joi.string()
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
                    .required(),
            
            favorite: Joi.boolean()
            
    });

     const validationResult =  schema.validate(req.body);

                if (validationResult.error) {
                
                 next (new ValidationError (validationResult.error))
      }
  
        next()
    },
    updateContactValidation: (req, res, next) => {
         const schema = Joi.object({
             
            name: Joi.string() 
                    .min(3)
                    .max(30)
                    .optional(),
                
             
            email: Joi.string()
                    .min(5)
                    .max(80)
                    .optional(),
                   
            
            phone: Joi.string()
                    .min(7)
                    .max(20)
                    .optional(),
            
           favorite: Joi.boolean()
            
                   
         });
        
        const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
                 next (new ValidationError ('missing fields'))
      }
  
        next()
        },
    updateStatusValidation: (req, res, next) => {
         const schema = Joi.object({
           favorite: Joi.boolean()
         });
        
        const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
             next (new ValidationError ('missing field favorite'))    
      }
  
        next()
        },
    userValidation: (req, res, next) => {
         const schema = Joi.object({
           email: Joi.string()
                    .min(5)
                    .max(80),
                 
           password: Joi.string()
                    .min(5)
                    .max(15),
         });
        
        const validationResult =  schema.validate(req.body);

        if (validationResult.error) {
             next (new WrongParametersError('Wrong parametrs'))    
      }
  
        next()
    },
}