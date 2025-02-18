import SimpleParallax from 'simple-parallax-js';
import paralaxicover from '../assets/Banner_image/home-slider-2.png';

const ParallaxImage = () => {
  return (
    <div className="w-full h-[500px] flex justify-center items-center overflow-hidden relative">
      <div className="relative">
        {/* Add ref to the image for SimpleParallax */}
        <SimpleParallax delay={1} transition="cubic-bezier(0,0,0,1)">
          <img
            src={paralaxicover}
            alt="Parallax Image"
            className="w-full object-cover object-center rounded-lg"
          />
        </SimpleParallax>
      </div>

      <div className="absolute flex justify-center items-center max-w-xl mx-auto h-full">
        <div>
          {' '}
          <h3 className="text-3xl font-bold mb-4 text-white">
            Adopt a Pet Today
          </h3>
          <p className="text-lg mb-6 text-white">
            Ready to open your heart to a pet in need? Explore our available
            pets for adoption and give them a forever home.
          </p>
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">
            Browse Pets
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParallaxImage;
