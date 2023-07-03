import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const storage = async () => {
    new GridFsStorage({
            url: process.env.MONGODB_URI,
            options: { useNewUrlParser: true,useUnifiedTopology: true },
            file: (req, file) => {
                const match = ["image/png", "image/jpg", "image/jpeg"];

                if(match.indexOf(file.mimetype) === -1){
                    return `${Date.now()}-diary-space-${file.originalname}`;
                }

                return {
                    bucketName: "photos",
                    filename: `${Date.now()}-diary-space-${file.originalname}`
                }
            }
        })
}

const upload = multer({ storage });

export default upload;
