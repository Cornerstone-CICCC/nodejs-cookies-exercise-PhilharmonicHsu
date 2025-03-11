"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [
    { id: 1, username: 'admin', password: 'admin12345' },
];
/**
 * Displays the home page
 *
 * @route GET /
 * @param {Request} req
 *
 */
pageRouter.get('/', (req, res) => {
    res.status(200).render('index');
});
/**
 * Displays login form
 *
 * @route GET /login
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders a page with a login form
 */
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
/**
 * Check user login details
 *
 * @route POST /login
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Responds with a cookie and redirect.
 */
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect('/login');
        return;
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        signed: true
    });
    res.cookie('username', username, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        signed: true
    });
    res.status(200).redirect('/profile');
});
/**
 * Log out user
 *
 * @route GET /logout
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirects to the login page
 */
pageRouter.get("/logout", (req, res) => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('username');
    res.status(301).redirect('/login');
});
/**
 * Get username from cookie
 *
 * @route GET /check
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Responds with username object
 */
pageRouter.get('/profile', auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.signedCookies;
    res.status(200).render('profile', { username });
});
exports.default = pageRouter;
