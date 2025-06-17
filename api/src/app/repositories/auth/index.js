import logger from '../../../../config/logger.js';

export class AuthRepository {
    constructor(UserModel){
        this.UserModel = UserModel;
    }

    findByEmail = async (email) => {
        logger.info('[AuthRepository] repository - findByEmail init', { email });

        try {
            const user = await this.UserModel.findOne({ where: { email } });
            if(!user){
                throw new Error("User not found!");
            }

            logger.info('[AuthRepository] repository - findByEmail finish');
            return user;
            
        } catch (error) {
            logger.error('[AuthRepository] repository - findByEmail error', error);
            throw error;
        }

    }
}