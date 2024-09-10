import config from '~/config';

// layout
import { HeaderOnly, HeaderSidebar } from '~/layouts';

// pages
import Home from '~/pages/Home';
import Faq from '~/pages/Faq';
import News from '~/pages/News';
import Event from '~/pages/Event';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import EditProfile from '~/pages/EditProfile';
import Activity from '~/pages/Activity';
import UserAccount from '~/pages/UserAccount';
import UserProfile from '~/pages/UserProfile';
import Hospital from '~/pages/Hospital';
import BloodDonor from '~/pages/BloodDonor';
import TrashUsers from '~/pages/TrashUsers';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.faq, component: Faq },
    { path: config.routes.event, component: Event },
    { path: config.routes.news, component: News },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
];

const privateRoutes = [
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
    { path: config.routes.editProfile, component: EditProfile, layout: HeaderOnly },
];

const adminRoutes = [
    { path: config.routes.activities, component: Activity, layout: HeaderSidebar },
    { path: config.routes.hospitals, component: Hospital, layout: HeaderSidebar },
    { path: config.routes.bloodDonors, component: BloodDonor, layout: HeaderSidebar },
    { path: config.routes.userAccounts, component: UserAccount, layout: HeaderSidebar },
    { path: config.routes.userProfiles, component: UserProfile, layout: HeaderSidebar },
    { path: config.routes.trashUsers, component: TrashUsers, layout: HeaderSidebar },
];

export { publicRoutes, privateRoutes, adminRoutes };
