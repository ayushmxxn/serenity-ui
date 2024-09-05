import React from 'react';
import FlipCard3D from '../components/cards/3dflipcard/components/FlipCard3D';


function Page () {
  const images = [
    { src: "https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Rabbit" },
    { src: "https://images.pexels.com/photos/321552/pexels-photo-321552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Monkey" },
    { src: "https://images.pexels.com/photos/208821/pexels-photo-208821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Donkey" },
    { src: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=600", alt: "Cow" },
    { src: "https://images.pexels.com/photos/70568/spotted-baumwaran-monitor-tree-monitor-lizard-70568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Chameleon" },
  ];

  return (
    <div>
      <FlipCard3D images={images} />
    </div>
  );
};

export default Page;
