import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img from '../assets/image/image1.png';
import img2 from '../assets/image/img-2.png';
import img3 from '../assets/image/img3.png';
const PetsService = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  return (
    <section>
      <div className="py-4 my-10">
        <p className="text-center text-sm font-bold text-gray-800">
          PETS SERVICES
        </p>
        <h2 className="text-4xl font-bold text-center text-gray-800 py-3">
          Meet Our Happy Families
        </h2>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mx-auto gap-4 w-full"
        data-aos="fade-up"
      >
        {/* cards 1 */}
        <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <img alt="" src={img2} className="h-56 w-full object-cover" />

          <div className="p-4 sm:p-6">
            <a href="#">
              <h3 className="text-lg font-medium text-gray-900">
                Vet Homeopath
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              They can increase opportunities to exercise and socialize.
            </p>

            <a
              href="#"
              className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
            >
              Find out more
              <span
                aria-hidden="true"
                className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
              >
                &rarr;
              </span>
            </a>
          </div>
        </article>
        {/* cards 2 */}
        <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <img alt="" src={img3} className="h-56 w-full object-cover" />

          <div className="p-4 sm:p-6">
            <a href="#">
              <h3 className="text-lg font-medium text-gray-900">
                Feathered pets
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              They give you a reason to get outside, get some fresh air.
            </p>

            <a
              href="#"
              className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
            >
              Find out more
              <span
                aria-hidden="true"
                className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
              >
                &rarr;
              </span>
            </a>
          </div>
        </article>
        {/* cards 3 */}
        <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <img alt="" src={img} className="h-56 w-full object-cover" />

          <div className="p-4 sm:p-6">
            <a href="#">
              <h3 className="text-lg font-medium text-gray-900">
                Veterinarian
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              Help manage loneliness by giving us companionship.
            </p>

            <a
              href="#"
              className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
            >
              Find out more
              <span
                aria-hidden="true"
                className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
              >
                &rarr;
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PetsService;
