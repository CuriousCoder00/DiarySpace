import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:5000';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (req, res) => {
  if(!req.file){
    return res.status(404).json({msg: "File Not Found."});
  }
  
  const imageUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json(imageUrl);

}


export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({filename: req.params.filename});
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
}