import multer from 'multer';


const multerStorage =multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/cars');
  },
  filename:(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    //const fileName =`${file.originalname}-${Date.now()}.${ext}`;
    const fileName =`${file.originalname}`;
    req.body.image=fileName;
    cb(null,fileName);
  },
});


const upload=multer({storage:multerStorage});


export const uploadImage=upload.single('image');

