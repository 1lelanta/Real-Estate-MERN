import express from 'express'
import { createListing } from '../controllers/listingContoller.js';

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

const listingRouter = router.post('/create',verifyToken, createListing)

export default  listingRouter