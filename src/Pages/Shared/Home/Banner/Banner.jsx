import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

import image1 from '../../../../assets/Banner_image/Banner1.jpg';
import image2 from '../../../../assets/Banner_image/Banner2.jpg';
import image3 from '../../../../assets/Banner_image/Banner3.png';
import { Carousel } from 'react-responsive-carousel';

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
        <div className="relative  ">
          <img
            src={image3}
            alt="Adopt a Pet - Banner 3"
            className="object-cover w-full h-[600px]"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-30">
            <div className="text-white px-4 w-96 md:w-[750px]  ml-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Stray Cat Alliance Stray Cat Alliance educates and empowers
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
                Explore Pets
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src={image2}
            alt="Find Your Companion - Banner 2"
            className="object-cover w-full h-[600px]"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white ">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Companion
            </h2>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg">
              Start Adopting
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src="https://www.banfieldfoundation.org/-/media/Project/Banfield/Main/en/Foundation/GrantPrograms/1099_01_Banner.jpeg?rev=0cab869402e4442883d05d672e547f70"
            alt="Give Them a Better Life - Banner 1"
            className="object-cover w-full h-[600px]"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center  text-center text-white px-4 w-96 md:w-[750px]  ml-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Where world-class medicine meets hometown care.
            </h2>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg">
              Adopt Now
            </button>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
