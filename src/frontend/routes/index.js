import { Routes, Route } from 'react-router-dom';
import MockAPI from '../../MockMan';
import Homepage from '../pages/homepage';
import IndividualPost from '../pages/individualPost';
import ExploreFeed from '../pages/explore';

// Routes
export const HOMEPAGE = '/';
export const MOCKMAN = '/mockman';
export const POST = '/:postId';

export const EXPLORE = '/explore';

export const availableRoutes = (
  <Routes>
    <Route exact path={HOMEPAGE} element={<Homepage />} />
    <Route exact path={MOCKMAN} element={<MockAPI />} />
    <Route exct path={POST} element={<IndividualPost />} />

    <Route exct path={EXPLORE} element={<ExploreFeed />} />
  </Routes>
);
