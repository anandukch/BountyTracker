import multer from "multer";
import path from "path";

function checkFileType(file, cb) {
	const filetypes = /zip/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb("Error: Zip Files Only!");
	}
}

const storage = multer.diskStorage({
	destination: "./uploads",
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

const fileUploadMiddleware = multer({
	storage: storage,
	// limits: { fileSize: 10000000 },
	// fileFilter: function (req, file, cb) {
	// 	checkFileType(file, cb);
	// },
});

export default fileUploadMiddleware;
