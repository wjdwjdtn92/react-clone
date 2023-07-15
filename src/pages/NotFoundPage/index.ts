import Button from '../../components/share/Button';
import useLoaction from '../../hooks/useLocation';
import { VDomType } from '../../types';

function NotFoundPage(): VDomType {
  const { navigate } = useLoaction();

  const handleButtonClick = () => {
    navigate('/');
  };

  return {
    type: 'div',
    props: {
      class:
        'w-full h-full flex flex-col justify-center items-center m-auto gap-[24px] ',
    },
    children: [
      {
        type: 'h1',
        props: { class: 'text-9xl text-orange-600' },
        children: ['Opps'],
      },
      {
        type: 'p',
        props: { class: 'text-2xl text-orange-400' },
        children: ['해당 페이지를 찾을 수 없습니다'],
      },
      Button({ onClick: handleButtonClick, children: ['홈으로 가기'] }),
    ],
  };
}

export default NotFoundPage;
