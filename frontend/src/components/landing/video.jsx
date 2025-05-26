import React from "react";
import '../../styles/video.css';

const PromoVideo = () => {
  return (
    <div className="promo-video-container">
        <div className="promo-video-caption">
        <h2>Compra y vende tu vehículo de forma segura y rápida</h2>
        <p>Explora nuestra plataforma para encontrar el coche ideal o vender el tuyo al mejor precio.</p>
        <br/>
      </div>
      <div className="promo-video-wrapper">
        <iframe
          className="promo-video"
          src="/videos/pisafondo_video_promocional.mp4"
          type="video/mp4"
          title="Video Promocional"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PromoVideo;