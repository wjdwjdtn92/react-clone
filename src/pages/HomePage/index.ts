import useLoaction from '../../hooks/useLocation';
import { VDomType } from '../../types';

function HomePage(): VDomType {
  const { navigate } = useLoaction();

  const handleButtonClick = (url: string) => {
    navigate(url);
  };

  return {
    type: 'div',
    props: {
      class: 'flex flex-col gap-10 justify-center items-center',
    },
    children: [
      {
        type: 'button',
        props: {
          class: 'w-[100px]',
          onClick: () => {
            handleButtonClick('/');
          },
        },
        children: ['go home'],
      },
      {
        type: 'button',
        props: {
          class: 'w-[100px]',
          onClick: () => {
            handleButtonClick('/record');
          },
        },
        children: ['go record'],
      },
    ],
  };
}

export default HomePage;
