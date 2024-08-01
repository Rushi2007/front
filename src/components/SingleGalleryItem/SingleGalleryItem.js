import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

const SingleGalleryItem = ({ galleryItem }) => {
  const { img } = galleryItem;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const images = [img];

  return (
    <>
      {open && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}

      <div className="col-lg-4 col-md-6 grid-item">
        <div className="portfolio-item mb-30">
          <div className="portfolio-wrapper">
            <div className="portfolio-image">
              <img src={img} alt="" />
              <div className="view-icon" onClick={() => setOpen(true)}>
                <button className="popup-image">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="portfolio-caption">
              <h4>Awesome Doctor</h4>
              <p>Medical</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleGalleryItem;
