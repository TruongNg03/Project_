const getUserId = () => {
    return localStorage.getItem('userId') || 'none';
};

const routes = {
    home: '/',
    faq: '/faq',
    event: '/event',
    news: '/news',
    profile: `/profile/user_id_${getUserId()}`,
    editProfile: `/profile/user_id_${getUserId()}/edit`,
    login: '/login',
    register: '/register',
    // admin
    activities: '/admin/manage/activities',
    hospitals: '/admin/manage/hospitals',
    bloodDonors: '/admin/manage/blood-donors',
    userAccounts: '/admin/manage/user-accounts',
    userProfiles: '/admin/manage/user-profiles',
};

export default routes;
