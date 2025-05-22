import registerController from '../controller/register';
import loginController from '../controller/login';
import createNewListController from '../controller/createNewList';
import cacheActivitiesController from '../controller/saveActvity';
import fetchNearbyController from '../controller/fetchNearby';
import { Router } from 'express';
import fetchFavouritesController from '../controller/fetchFvaourites';
import fetchListsController from '../controller/fetchLists';
import saveFavoritesController from '../controller/SaveFavorites';
const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/createNewList', createNewListController);
router.post('/saveActivities', cacheActivitiesController);
router.post('/fetchNearby', fetchNearbyController);
router.post('/fetchFavourites', fetchFavouritesController);
router.post('/fetchLists', fetchListsController);
router.post('/saveFavourites', saveFavoritesController);

export default router;