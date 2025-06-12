import registerController from '../controller/register';
import loginController from '../controller/login';
import createNewListController from '../controller/createNewList';
import cacheActivitiesController from '../controller/saveActvity';
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
import { fetchTrailsFromOSM } from '../controller/fetchData';
const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/createNewList',authenticateJWT, createNewListController);
router.post('/saveActivities',authenticateJWT, cacheActivitiesController);
router.post('/fetchNearby', fetchNearbyController);
router.post('/fetchFavourites',authenticateJWT, fetchFavouritesController);
router.post('/fetchLists',authenticateJWT,  fetchListsController);
router.post('/saveFavourites',authenticateJWT,  saveFavoritesController);
router.post('/removeFavourites',authenticateJWT, removeFavouritesController);
router.post('/deleteList',authenticateJWT, deleteListController);
router.put('/updateProfile', authenticateJWT, updateProfileController);
router.get('/getProfile', authenticateJWT, getProfileController);
router.post('/uploadProfilePic', authenticateJWT, upload.single('profilePic'),uploadProfilePicController);
router.get('/fetchData', async (req, res) => {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "latitude and longitude required" });
    }
    try {
        const data = await fetchTrailsFromOSM(
            Number(latitude),
            Number(longitude),
            radius ? Number(radius) : 10000
        );
        res.json({ elements: data });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch from OSM", details: err });
    }
});

export default router;