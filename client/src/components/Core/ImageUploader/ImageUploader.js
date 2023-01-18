import ImageUploading from 'react-images-uploading';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {useState, useRef, useEffect} from 'react'
import './ImageUploader.css'
import {imgPreview} from './croppedImage'
function ImageUploader() {
    const initCrop = {
        unit: 'px',
        width: 100,
        height: 100,
        x: 200,
        y: 100
    }
    const [images, setImages] = useState([]);
    const [croppedImage, setCroppedImage] = useState();
    const [crop, setCrop] = useState(initCrop);
    const [cropDone, setCropDone] = useState(false)
    const [onComplete, setOnComplete] = useState()

    useEffect(()=>{

    },[])

    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    };

    const getCroppedImage = async ()=>{
        let image = new Image();
        let croppedObj = document.getElementById("cropped")
        image.width = croppedObj.width
        image.height= croppedObj.height
        image.src = images[0].data_url
        let data = await imgPreview(image,onComplete)
        setCropDone(true)
        setCroppedImage(data);
    }

    return (
        <>
            <ImageUploading
                multiple="false"
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        {imageList.length <= 0 && (
                            <div
                                className="dropable-zone"
                                style={
                                    isDragging ? { color: "red" } : undefined
                                }
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                        )}
                        {images.length > 0 && !cropDone && (
                            <>
                            <div className="upload-toolbar">
                            <button onClick={() => onImageRemove(0)}>
                            <i
                                class="fa fa-trash"
                                aria-hidden="true"
                            ></i>
                            </button>
                           
                            <button onClick={() => getCroppedImage()}>DONE</button>
                            </div>

                            <div className="dropable-zone">
                                <ReactCrop
                                    onComplete={(c) => setOnComplete(c)}
                                    keepSelection={true}
                                    aspect={1}
                                    crop={crop}
                                    onChange={(c) => setCrop(c)}
                                >
                                    <img
                                        style={{
                                            width: "inherit",
                                            height: "auto",
                                        }}
                                        id="cropped"
                                        width={350}
                                        height={250}
                                        src={images[0].data_url}
                                    />
                                    {console.log(
                                        document.getElementById("cropped")
                                    )}
                                </ReactCrop>
                            </div>
                            </>
                        )}
                    </div>
                )}
            </ImageUploading>
            {cropDone && (
                <div className="cropped-done-wrapper">
                    <img className="cropped-preview" src={croppedImage}></img>
                </div>
            )}
        </>
    );
}

export default ImageUploader;
