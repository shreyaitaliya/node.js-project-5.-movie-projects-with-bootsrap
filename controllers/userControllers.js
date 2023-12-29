const userCrud = require('../models/usertbl');
const fs = require('fs');

const view = async (req, res) => {
    try {
        let viewRec = await userCrud.find({})
        return res.render('view', {
            viewRec
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const add = (req, res) => {
    return res.render('add');
}

const addRecord = async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let image = req.file.path;
        if (!name || !description || !price || !image) {
            console.log("all filed Are required");
            return false;
        }
        let insertData = await userCrud.create({
            name, description, price, image
        })
        console.log('user create');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteRecord = async (req, res) => {
    try {
        let delfile = await userCrud.findById(req.query.delid)
        fs.unlinkSync(delfile.image);
        let delReco = await userCrud.findByIdAndDelete(req.query.delid)
        console.log("delete sucessfully");
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let editre = await userCrud.findById(req.query.editid)
        return res.render('edit', {
            editre
        })
    } catch (error) {
        console.log(error);
        return false;
    } 
}

const updateRecord = async (req, res) => {
    if (req.file) {
        try {
            let imgreplace = await userCrud.findById(req.body.editid)
            fs.unlinkSync(imgreplace.image);
        } catch (error) {
            console.log(error);
            return false;
        }
        //record update with file
        try {
            let recupdate = await userCrud.findByIdAndUpdate(req.body.editid, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.file.path,
            })
            return res.redirect('/');

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    else {
        try {
            let updaterec = await userCrud.findById(req.body.editid)
            let update = await userCrud.findByIdAndUpdate(req.body.editid, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: updaterec.image,
            })
            return res.redirect('/');
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = ({
    view, add, addRecord, deleteRecord, editRecord, updateRecord
})
