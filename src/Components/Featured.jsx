import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Featured = () => {
  useEffect(() => {
    AOS.init({
      offset: 500,
      duration: 500,
      easing: 'ease-in-out',
      anchorPlacement: 'top-bottom',
    });
  }, []);
  return (
    <div data-aos="fade-up">
      <h2 className="text-2xl text-center mt-6 pb-3">Featured Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4">
        <div>
          <img
            src="https://www.animalhumanesociety.org/sites/default/files/styles/crop_15_10_480x320/public/media/image/2023-07/dsc02178_0.jpg?h=a1e1a043&itok=syjCpoc-"
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-xl pt-3">Housetraining: a survival guide</p>
        </div>
        <div>
          <img
            src="https://www.animalhumanesociety.org/sites/default/files/styles/crop_15_10_480x320/public/media/image/2019-03/Tuck%20in%20crate.jpg?h=b3660f0d&itok=8u14ay6x"
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-xl pt-3">HCrate training your dog or puppy</p>
        </div>
        <div>
          <img
            src="https://www.animalhumanesociety.org/sites/default/files/styles/crop_15_10_480x320/public/media/image/2019-09/Cat%20with%20sharp%20claws.jpg?h=a955cd85&itok=4pAgdrw5"
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-xl pt-3">Managing scratching behavior in cats</p>
        </div>
        <div>
          <img
            src="https://www.animalhumanesociety.org/sites/default/files/styles/crop_15_10_480x320/public/media/image/2022-03/AHS%20dog%20training_16x9.jpg?h=c673cd1c&itok=Z4winIW4"
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-xl pt-3">
            HoWhy dog training is important – for both you and your dog
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
