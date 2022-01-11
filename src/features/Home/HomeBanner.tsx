import Slider from "react-slick";
import logo1 from "assets/doctor_strange_desktop.jpeg";
import logo2 from "assets/bridesheat_desktop.jpeg";
import logo3 from "assets/transformer_desktop.jpeg";

const HomeSliderSettings = {
  dots: true,
  infinite: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const HomeBanner = () => {
  return (
    <Slider {...HomeSliderSettings}>
      <div>
        <img src={logo1} alt="logo1" />
      </div>
      <div>
        <img src={logo2} alt="logo2" />
      </div>
      <div>
        <img src={logo3} alt="logo3" />
      </div>
    </Slider>
  );
};
