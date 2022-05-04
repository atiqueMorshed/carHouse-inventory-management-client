import {
  faFacebookF,
  faGithub,
  faGoogle,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <div className="dark:bg-darkGray-500 pt-20 mt-32 text-black dark:text-white border-t border-primaryBlue-500">
      <div className="grid grid-cols-3 place-items-center pb-20">
        <div className=" flex flex-col gap-6 justify-center items-start text-lg">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              className="h-6 w-6 p-3 rounded-full"
              icon={faPhone}
            />
            <p>+880-1711111111</p>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              className="h-6 w-6 p-3 rounded-full"
              icon={faLocationDot}
            />
            <p>68 Mohakhali, Dhaka</p>
          </div>

          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              className="h-6 w-6 p-3 rounded-full"
              icon={faEnvelope}
            />
            <p>iamsamix17@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl text-center pb-8">Our Social Platforms</h1>
          <div className="">
            <div className="flex gap-6 md:gap-12 justify-center mb-7">
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="h-7 w-7" icon={faGoogle} />
              </a>
              <a
                rel="noreferrer"
                href="https://www.twitter.com"
                target="_blank"
              >
                <FontAwesomeIcon className="h-7 w-7" icon={faTwitter} />
              </a>
              <a
                rel="noreferrer"
                href="https://www.facebook.com"
                target="_blank"
              >
                <FontAwesomeIcon className="h-7 w-7" icon={faFacebookF} />
              </a>
              <a rel="noreferrer" href="https://www.twitch.com" target="_blank">
                <FontAwesomeIcon className="h-7 w-7" icon={faTwitch} />
              </a>
              <a rel="noreferrer" href="https://www.github.com" target="_blank">
                <FontAwesomeIcon className="h-7 w-7" icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl text-center pb-8">About Us</h1>
          <p className="w-[350px] mx-auto text-justify">
            CarHouse is a car inventory management system. CarHub allows you to
            manage your car inventory very easily. keep track of your supplies,
            and your sold cars. And the extra protection of JWT keeps your data
            safe.
          </p>
        </div>
      </div>
      <div className="border-t py-5 text-center border-primaryBlue-500">
        &copy; 2022 | Atique Morshed | All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
