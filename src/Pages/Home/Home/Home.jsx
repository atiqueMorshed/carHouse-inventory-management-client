import React from 'react';
import Banner from '../Banner/Banner';
import CarShowcase from '../CarShowcase/CarShowcase';
import LatestModifiedCars from '../LatestModifiedCars/LatestModifiedCars';

const Home = () => {
  return (
    <div>
      {/* <Title title="Home" /> */}
      <div>
        <Banner />
        <CarShowcase />
        <LatestModifiedCars />
      </div>
    </div>
  );
};

export default Home;
