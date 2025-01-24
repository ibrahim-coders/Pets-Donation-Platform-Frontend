import img from '../assets/dog.webp';
const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white pt-12 mt-10 ">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Donation Section */}
          <div className="space-y-4">
            <h2 className="text-2xl ">
              <img
                src={img}
                className="h-16 w-16 rounded-full text-start mb-3"
                alt=""
              />
              Together we can make this world a better place for our nonhuman
              companions, one day at a time, one animal at a time!
            </h2>
            <p>Donate Now and help improve the lives of animals in need.</p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-700 transition-all">
              DONATE NOW
            </button>
          </div>

          {/* Contacts Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">CONTACTS</h3>
            <p>Bangalore, India</p>
            <p>Phone: 1800 102 8032</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>

          {/* Discover Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">DISCOVER</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-500">
                  FAQ’s
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Animal Protection Laws
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Become a Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Report an Animal in Distress
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Donors Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">DONORS</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-500">
                  One Day Meal Programme
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  CSR Donations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Donate in Honor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Sponsor a Dog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 py-4 mt-12">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Pet Adoption Organization. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
