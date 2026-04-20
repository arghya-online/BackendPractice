import multer from "multer";

//multer configuration
//it is used to store the uploaded files in the "public/uploads" directory and the filename will be the original name of the file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
