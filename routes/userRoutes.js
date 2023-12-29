const express = require('express');

const routes = express.Router();

const controllers = require('../controllers/userControllers');

const multer = require('multer');
const userControllers = require('../controllers/userControllers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single('image');

routes.get('/', controllers.view);
routes.get('/add', controllers.add);
routes.post('/addRecord', upload, controllers.addRecord);
routes.get('/deleteRecord', controllers.deleteRecord);
routes.get('/editRecord', controllers.editRecord);
routes.post('/updateRecord', upload, controllers.updateRecord);

module.exports = routes