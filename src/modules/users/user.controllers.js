import User from './user.model';
import HTTPStatuses from 'http-status';

export async function signUp(req, res) {
     try {
         const user = await User.create(req.body);
         return res.status(HTTPStatuses.CREATED).json(user.toAuthJSON());
     } catch (e) {
         return res.status(HTTPStatuses.BAD_REQUEST).json(e);
     }
}

export function login(req, res, next) {
    res.status(HTTPStatuses.OK).json(req.user.toAuthJSON());
    //createToken()
    return next();
}