import React from 'react';

import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';

import './About.css';

const About = () => {
  const position = [23.80669442713535, 90.4134871726442];

  return (
    <div className="mt-32">
      <h1 className="text-4xl text-center mb-14">About</h1>
      <h1 className="max-w-[90%] mx-auto text-xl mb-4">
        Our headquarter is in Dhaka, Bangladesh
      </h1>
      <div className="max-w-[90%] mx-auto h-[600px] rounded-lg overflow-hidden mb-14">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-xl mb-4">What do we do?</h1>
        <p className="mb-4">
          CarHouse is an inventory management website. It lets you add your cars
          to the inventory items. Whenever a car is delivered, you can update
          the infomation by clicking on the delivered button on the car page.
          That'll update the quantity and sold fields accordingly. You can also
          restock your inventory by a set amount in that page. You can also see
          car sales information in the homepage.
        </p>
        <p>
          We care about your security. After logging in, the actions like adding
          a car, changing delivery status, restocking, deleting a car of an user
          is authenticated by JWT.
        </p>
      </div>
    </div>
  );
};

export default About;
