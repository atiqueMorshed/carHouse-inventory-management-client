import React from 'react';
import Title from '../../Shared/Title/Title';
import Banner from '../Banner/Banner';
import CarShowcase from '../CarShowcase/CarShowcase';

const Home = () => {
  return (
    <div>
      <Title title="Home" />
      <div>
        <Banner />
        <CarShowcase />
      </div>
    </div>
  );
};

export default Home;
