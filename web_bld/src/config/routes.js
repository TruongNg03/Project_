const getUserId = () => {
    return localStorage.getItem('userId') || 'none';
};

const routes = {
    home: '/',
    faq: '/faq',
    event: '/event',
    news: '/news',
    profile: `/profile/user_id_${getUserId()}`,
    login: '/login',
    register: '/register',
};

export default routes;
