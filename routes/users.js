const UsersHandler = require('../handlers/users');
const express = require('express');
const router = express.Router();
const usersHandler = new UsersHandler();
const sessionHelper = require('../helpers/session');
const checkAuthentication = sessionHelper.checkAuthentication;
const destroySession = sessionHelper.destroySession;

router.get('/', /*checkAuthentication,*/ usersHandler.getAllUsers);
router.get('/showUserWithSubscribes/:id', usersHandler.getUserWithSubscribes);
router.get('/currentUser', usersHandler.getCurrentUser);

router.post('/signUp', usersHandler.signUp);
router.post('/createModerator', usersHandler.createModerator);
router.post('/signIn', usersHandler.signIn);
router.post('/logout', destroySession, usersHandler.logout);
router.post('/createUser', usersHandler.createUser);

router.patch('/:id', checkAuthentication, usersHandler.updateUser);

router.delete('/delete/:id', usersHandler.deleteUser);


module.exports = router;