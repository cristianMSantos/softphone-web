export class AuthMiddleware {
    constructor(){
        this.authMiddleware = async (req, res, next) => {
            next();
        }
    }
}