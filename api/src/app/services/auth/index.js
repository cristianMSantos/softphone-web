import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../../../config/logger.js';

export class AuthService {
    constructor(authRepository){
        this.authRepository = authRepository;
    }

    login = async (email, password) => {
        logger.info('[AuthService] service - login init', { email });

        try {
            const user = await this.authRepository.findByEmail(email);
            if(!user){
                throw new Error("User not found!");                    
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                throw new Error("Invalid password!");
            }

            const accessToken  = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            
            logger.info('[AuthService] service - login finish');
            return { accessToken, refreshToken, user }; 
        } catch (error) {
            logger.error('[AuthService] service - login error', error);
            throw error;
        }
    }

    refreshToken = async (refreshToken) => {
        logger.info('[AuthService] service - refreshToken init', { refreshToken });

        try {
            const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);

            if (!decodedToken || !decodedToken.id || !decodedToken.email) {
                throw new Error("Invalid token structure.");
            }

            const newAcessToken = jwt.sign({ id: decodedToken.id, email: decodedToken.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            logger.info('[AuthService] service - refreshToken finish');
            return newAcessToken;
        }catch(error){
            logger.error('[AuthService] service - refreshToken error', error);
            throw error;
        }
    }
}
