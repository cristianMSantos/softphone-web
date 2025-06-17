import logger from '../../../../config/logger.js';

export class AuthController {
    constructor(authService){
        this.authService = authService;
    }

    login = async (req, res, next) => {
        logger.info('[AuthController] controller - login init', { req });
        const { email, password } = req.body;

        try {
            const {accessToken, refreshToken, user} = await this.authService.login(email, password);

            logger.info('[AuthController] controller - login finish');
            res.status(200).json({
                message: 'Login success!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                accessToken,
                refreshToken
            });
        } catch (error) {
            logger.error('[AuthController] controller -  login error', error);
            next(error);
        }
    }

    refreshToken = async (req, res, next) => {
        logger.info('[AuthController] controller - refreshToken init', { req });
        const { refreshToken } = req;

        try {
            const newAcessToken = await this.authService.refreshToken(refreshToken);
            logger.info('[AuthController] controller - refreshToken finish');
            res.status(200).json({
                message: 'Refresh token success!',
                accessToken: newAcessToken
            });
        }catch(error){
            logger.error('[AuthController] controller - refreshToken error', error);
            next(error);
        }
    }
}