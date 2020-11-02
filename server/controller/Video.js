
const express = require('express');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const {Video} = require("../model/Video");
const videoController = {};


var storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, './videos/')
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


videoController.addVideo = (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
}


videoController.addThumbnail = (req, res) => {
    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "videos/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: './videos/',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
}
videoController.saveVideo  = (req, res) => {
        const video = new Video(req.body)
      
        video.save((err, video) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true 
            })
        })
      

}
videoController.getVideo = async(req, res) => { 
    try {
        const data = await Video.find();
        return res.json(data);
      } catch (err) {
        res.json(err);
      }
}
module.exports = videoController;