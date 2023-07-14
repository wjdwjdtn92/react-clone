import Header from '../../components/share/Header';
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
      class: 'w-full h-full m-auto flex justify-center items-center',
    },
    children: [
      Header(),
      {
        type: 'div',
        props: { class: 'text-3xl' },
        children: ['Home 입니다'],
      },
    ],
  };
}

export default HomePage;
