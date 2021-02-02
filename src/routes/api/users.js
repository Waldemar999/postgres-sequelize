import { Router } from 'express';
import { validateSchema } from '../../middlewares/validationMiddleware.js';
import { userCreateSchema, userUpdateSchema } from '../../validators/usersValidators.js';
import {
  createUser, updateUser, deleteUser, getUser, getUsersList,
} from '../../controllers/userController.js';

const router = Router();

router.get('/:UUID', getUser);

router.post('/', validateSchema(userCreateSchema), createUser);

router.put('/:UUID', validateSchema(userUpdateSchema), updateUser);

router.delete('/:UUID', deleteUser);

router.get('/', getUsersList);

export default router;
