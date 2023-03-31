import Slider from "react-slick";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Image } from "react-bootstrap";
const SliderComponent = ({ data }) => {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <ArrowBackIcon alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <ArrowForwardIcon alt="nextArrow" {...props} />
  );
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  return (
    <Slider
      {...settings}
      style={{
        overflow: "hidden",
        width: "80%",
        margin: "auto",
      }}
    >
      {data.map((item, index) => {
        return (
          <div key={index} className="slider__container">
            {/* <div
              className="slider__image"
              style={{
                backgroundImage: "url(" + item.imageURI + ")",
                backgroundSize: "contain",
              }}
            /> */}
            <Image className="slider__image" src={item.imageURI} alt="image" />
          </div>
        );
      })}
    </Slider>
  );
};
export default SliderComponent;
