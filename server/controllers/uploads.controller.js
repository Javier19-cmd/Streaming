import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import {
    GridFsStorage
} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

const connection = mongoose.createConnection("mongodb+srv://admin:admin@cluster0.ko8ocfl.mongodb.net/Prueba?retryWrites=true&w=majority");
let gfs = null;
let gridfsBucket = null;

connection.once('open', () => {
    console.log('second connection')
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
    gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'uploads'
    });
});

const storage = new GridFsStorage({
    url: "mongodb+srv://admin:admin@cluster0.ko8ocfl.mongodb.net/Prueba?retryWrites=true&w=majority",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
export const upload = multer({ storage });

export const uploadFile = (req, res) => {
    res.json({
        file: req.file
    });
}

export const listFiles = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                msg: 'No hay imágenes',
                code: 404
            })
        }
        return res.json(files);
    })
}

export const getFile = (req, res) => {
    gfs.files.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                msg: 'No existe la imagen',
                code: 404
            })
        }
        return res.json(file);
    })
}

export const getImage = (req, res) => {
    gfs.files.findOne({
        filename: req.params.filename
    }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                msg: 'No existe la imagen',
                code: 404
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gridfsBucket.openDownloadStream(file._id);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                mag: 'No es una imagen',
                code: 404
            });
        }
    });
}