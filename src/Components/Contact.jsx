import { Helmet } from 'react-helmet-async';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <Helmet>
        <title>Animals | Contact</title>
      </Helmet>
      <div className="shadow-lg rounded-xl p-8 w-full max-w-3xl">
        {/* Contact Heading */}
        <h2 className="text-3xl font-bold text-center  mb-6">Get in Touch</h2>
        <p className="text-center  mb-8">
          We'd love to hear from you! Whether you have a question about pet
          adoption, donations, or anything else, our team is ready to help.
        </p>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block  font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block  font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block  font-medium">Your Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition">
            Send Message
          </button>
        </form>

        {/* Contact Info Section */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <div className="flex items-center justify-center space-x-4 mt-4 ">
            <FaPhoneAlt className="text-blue-600" /> <span>+1 234 567 890</span>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-2 ">
            <FaEnvelope className="text-blue-600" />{' '}
            <span>info@petadoption.com</span>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <FaMapMarkerAlt className="text-blue-600" />{' '}
            <span>123 Pet Street, New York, USA</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6 ">
          <a href="#" className="hover:text-blue-600">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
