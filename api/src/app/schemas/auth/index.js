import Joi from 'joi';

export class AuthSchema {
    constructor(){
        this.loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });

        this.refreshTokenSchema = Joi.object({
            refreshToken: Joi.string().required()
        })
    }

    

    validateLogin = (req, res, next) => {
        const { error } = this.loginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(detail => detail.message)
            });
        }

        next();
    };

    refreshToken = (req, res, next) => {
        const refreshToken = req.headers['authorization']?.split(' ')[1];

        const { error } = this.refreshTokenSchema.validate({ refreshToken }, { abortEarly: false });

        if(error){
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map(detail => detail.message)
            })
        }

        req.refreshToken = refreshToken;

        next();
    }

}