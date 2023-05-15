import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export const ImageGallery = ({ inputValue, onClick, loadMoreBtn, page }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (inputValue) {
      fetchLoad();
    }
  }, [inputValue]);

  useEffect(() => {
    if (page > 1) {
      fetchLoadMore();
    }
    return;
  }, [page]);

  const fetchLoad = () => {
    getImages(inputValue, page)
      .then(response => {
        setImages(response.hits);
        setStatus('resolve');
      })
      .catch(error => setStatus('rejected'));
  };

  const fetchLoadMore = () => {
    getImages(inputValue, page)
      .then(response => {
        setImages([...images, ...response.hits]);
        setStatus('resolve');
      })
      .catch(error => setStatus('rejected'));
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolve') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {images.length !== 0 ? (
          <Button onClick={loadMoreBtn} />
        ) : (
          alert('No results')
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
