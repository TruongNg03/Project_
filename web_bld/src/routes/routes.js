import config from '~/config';

// layout
import { HeaderOnly } from '~/layouts';

// pages
import Home from '~/pages/Home';
import Faq from '~/pages/Faq';
import News from '~/pages/News';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.faq, component: Faq },
    { path: config.routes.news, component: News },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
