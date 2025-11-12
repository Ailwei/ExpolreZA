import registerController from '../controller/register';
import loginController from '../controller/login';
import createNewListController from '../controller/createNewList';
import fetchNearbyController from '../controller/fetchNearby';
import { Router } from 'express';
import fetchFavouritesController from '../controller/fetchFvaourites';
import fetchListsController from '../controller/fetchLists';
import saveFavoritesController from '../controller/SaveFavorites';
import removeFavouritesController from '../controller/removeFavourite';
import deleteListController from '../controller/deleteList';
import { authenticateJWT } from '../middleWare/authenticateJwt';
import updateProfileController from '../controller/updateProfile';
import getProfileController from '../controller/getProfile';
import uploadProfilePicController from '../controller/updateProfilePicture';
import upload from '../middleWare/multer';
import fetchDataController from '../controller/fetchData';
const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/createNewList',authenticateJWT, createNewListController);
router.post('/fetchNearby', fetchNearbyController);
router.post('/fetchFavourites',authenticateJWT, fetchFavouritesController);
router.post('/fetchLists',authenticateJWT,  fetchListsController);
router.post('/saveFavourites',authenticateJWT,  saveFavoritesController);
router.post('/removeFavourites',authenticateJWT, removeFavouritesController);
router.post('/deleteList',authenticateJWT, deleteListController);
router.put('/updateProfile', authenticateJWT, updateProfileController);
router.get('/getProfile', authenticateJWT, getProfileController);
router.post('/uploadProfilePic', authenticateJWT, upload.single('profilePic'),uploadProfilePicController);
router.get('/fetchData',authenticateJWT, fetchDataController )
    
    
export default router;