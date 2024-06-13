
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} ujjwalsinghkashyap12@gmail.com. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="text-white hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
