import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const storage = new GridFsStorage({
  url: `${process.env.MONGODB_URI}`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if(match.indexOf(file.memeType) === -1) 
        return`${Date.now()}-diary-space-${file.originalname}`;

    return {
        bucketName: "photos",
        filename: `${Date.now()}-diary-space-${file.originalname}`
    }
}
});

export default multer({ storage });