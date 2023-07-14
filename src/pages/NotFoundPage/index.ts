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
      {
        type: 'button',
        props: {
          type: 'button',
          class:
            'text-2xl text-neutral-50 border-4 rounded-3xl border-sky-400 p-[16px] bg-sky-400 hover:text-sky-500 hover:bg-neutral-50  ',
          onclick: handleButtonClick,
        },
        children: ['home으로 가기'],
      },
    ],
  };
}

export default NotFoundPage;
