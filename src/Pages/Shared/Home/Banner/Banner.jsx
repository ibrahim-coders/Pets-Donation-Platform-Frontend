import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

import image1 from '../../../../assets/Banner_image/home-slider-1.png';
import image2 from '../../../../assets/Banner_image/Slide3-2.jpg';
import image3 from '../../../../assets/Banner_image/slide3-3.jpg';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="relative bg-gray-50">
      <Carousel
        className="max-h-[600px]"
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
        showIndicators
        emulateTouch
      >
        {/* Slide 1 */}
        <div className="relative  bg-black bg-opacity-30">
          <img
            src={image3}
            alt="Adopt a Pet - Banner 3"
            className="object-cover object-center w-full h-[500px]"
          />
          <div className="absolute top-[12%] left-[10%] inset-0 flex flex-col justify-center items-start text-center ">
            <div className="text-white px-4  text-start w-96 md:w-[750px]  space-y-6">
              {/* Heading Section */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-medium">
                  Every Pet Deserves
                </h2>
                <span className="text-white text-2xl md:text-4xl font-bold">
                  A Loving Home
                </span>
              </div>

              {/* Description Section */}
              <div>
                <p className="text-white text-xl ">
                  Countless adorable pets are waiting for a second chance. Adopt
                  today and give them the care, love, and home they truly
                  deserve. Every adoption saves a life!
                </p>
              </div>

              {/* Button Section */}
              <div>
                <button className="pt-2">
                  <Link
                    to="/pet-listing"
                    className="bg-blue-600 transition duration-300 ease-in-out hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg"
                  >
                    Explore Pets for Adoption
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src={image2}
            alt="Find Your Companion - Banner 2"
            className="object-cover w-full h-[500px]"
          />
          <div className="absolute top-[12%] left-[10%] inset-0 flex flex-col justify-center items-start text-center  ">
            <div className="text-white px-4 sm:ml-8 text-start w-96 md:w-[750px]   md:l-20 space-y-2">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-medium">
                  The Joy of Adoption
                </h2>
                <p className="text-white text-xl pb-6">
                  When you adopt, you provide a second chance to a pet in need.
                  From playful puppies to cuddly cats, every pet deserves a
                  family.
                </p>
              </div>
              <button className="">
                {' '}
                <Link
                  to="/pet-listing"
                  className="bg-orange-400 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  Pets for Adoption
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src={image1}
            alt="Give Them a Better Life - Banner 1"
            className="object-cover w-full h-[500px]"
          />
          <div className="absolute top-[12%] left-[10%] inset-0 flex flex-col justify-center items-start text-center">
            <div className="text-white px-4 text-start w-96 md:w-[750px]    space-y-3">
              <h2 className="text-2xl md:text-4xl font-medium">
                Find Your New Best Friend
              </h2>
              <p className="text-white text-xl ">
                Browse our adoption listings and take the first step toward
                finding a furry companion. Open your heart, and make a
                difference today!
              </p>
              <button className="pt-2">
                {' '}
                <Link
                  to="/pet-listing"
                  className="bg-blue-600 transition duration-300 ease-in-out hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  Pets for Adoption
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
