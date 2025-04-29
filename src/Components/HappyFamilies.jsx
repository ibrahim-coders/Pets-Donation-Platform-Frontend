import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HappyFamilies = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <section className="py-12  ">
      <div className="max-w-6xl mx-auto px-4">
        <div className=" px-4 mx-auto gap-4 w-full">
          <div
            className="overflow-hidden transform hover:scale-105 transition duration-100"
            data-aos="zoom-in"
          >
            <div className="w-full flex flex-col md:flex-row gap-6 items-center md:items-start my-10">
              {/* Text Content Section */}
              <div className="flex-1 space-y-4 px-4">
                <h2 className="text-2xl md:text-3xl font-bold ">
                  OWP packages designed for all ages and stages
                </h2>
                <p className=" text-base md:text-lg leading-relaxed">
                  We offer a range of OWPs designed for different needs, ages,
                  and lifestyles, from fuzzy puppies to senior statescats. Plus,
                  you always get a one-on-one consult with a Banfield vet when
                  you enroll your pet for an OWP, so you can feel sure you’re
                  getting the right package of services for your furry friend.
                </p>
              </div>

              {/* Image Section */}
              <div className="flex-1">
                <img
                  src="https://www.banfield.com/-/media/Project/Banfield/Main/en/OWP/OWP-Overview/senior-dog-lays-grass.jpg?h=540&w=960&rev=bb67c840eaf74e99a45b8398a83c6971&hash=5D075AD6281FD11DF5F5BE94375F3956"
                  alt="Senior dog lying on grass"
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 items-center md:items-start my-10">
              {/* Image Section */}
              <div className="flex-1">
                <img
                  src="https://www.banfield.com/-/media/Project/Banfield/Main/en/OWP/OWP-Overview/woman-cat-couch-tablet.jpg?h=1080&w=1920&rev=ac0330529cce4a95817e8280f310bc57&hash=7A41C840BF8F167B993CC964E5E0A499"
                  alt=""
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              </div>
              <div className="flex-1 space-y-4 px-4">
                <h2 className="text-2xl md:text-3xl font-bold ">
                  ntroducing Banfield virtual visits
                </h2>
                <p className=" text-base md:text-lg leading-relaxed">
                  Let’s face it — our pets don’t want to go to the vet. They’d
                  rather be lazy couch loafs. The good news is that our virtual
                  petcare services let you speak to a veterinary professional
                  from the comfort of your home, so you can continue treating
                  your furry pal like the king or queen they are.
                </p>
                <a href="" className="text-orange-700">
                  See the videos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HappyFamilies;
