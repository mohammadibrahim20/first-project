import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
export const sentImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dyv26wz9o',
    api_key: '566492638533417',
    api_secret: 'gfg',
  });

  cloudinary.uploader.upload(
    '/home/my_image.jpg',
    { upload_preset: 'my_preset' },
    (error, result) => {
      console.log(result, error);
    },
  );
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
