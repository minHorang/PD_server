import Multer from "multer";
import multerGoogleStorage from "multer-google-storage";
import { Storage } from "@google-cloud/storage";
import dotenv from 'dotenv';
import { response } from "../../../config/response.js";
import { status } from "../../../config/response.status.js";

dotenv.config();

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILE_NAME,
});

export const createMulter = (folder) => {
    return Multer({
        storage: multerGoogleStorage.storageEngine({
            bucket: process.env.GCLOUD_STORAGE_BUCKET,
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.KEY_FILE_NAME,
            filename: (req, file, cb) => {
                cb(null, `${folder}/${Date.now()}_${file.originalname}`);
            },
            contentType: (req, file) => {
                // 특정 파일 확장자에 따라 MIME 타입 설정
                const mimeType = file.mimetype === 'image/png' || file.mimetype === 'image/gif' ? file.mimetype : 'image/jpeg';
                return mimeType;
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024, // 최대 파일 크기: 5MB
        },
    });
};

export const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}`;
};

export const uploadImage = (req, res, next) => {
    const folder = req.params.folder;
    const upload = createMulter(folder);

    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return next(err);
        }

        const publicUrl = getPublicUrl(req.file.filename);


         // 파일을 공개적으로 설정
        try {
            await storage.bucket(process.env.GCLOUD_STORAGE_BUCKET).file(req.file.filename).makePublic();
        } catch (error) {
            console.error('Error making file public:', error);
            return next(error);
        }

        // 업로드 성공 시 처리
        res.send(response(status.IMAGE_SAVE_SUCCESS,publicUrl));
    });
};

