import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Summer Collection '26",
      subtitle: "Embrace the season with our new lightweight fabrics and pastel hues.",
      bgImage: "url('/hero2.jpg')",
      link: "/new-arrivals"
    },
    {
      id: 2,
      title: "Festive Unstitched",
      subtitle: "Discover the elegance of our intricately embroidered festive unstitched ensembles.",
      bgImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/img1.jpg')",
      link: "/unstitched"
    },
    {
      id: 3,
      title: "Ready to Wear",
      subtitle: "Step out in style with our latest pret collection for every occasion.",
      bgImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/hero1.jpg')",
      link: "/ready-to-wear"
    }
  ];

  return (
    <section className="hero-slider-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
        style={{ width: '100%', height: '90vh' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="hero-slide-bg" 
              style={{
                backgroundImage: slide.bgImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to={slide.link} className="btn" style={{ display: 'inline-block', textDecoration: 'none' }}>Shop Now</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
