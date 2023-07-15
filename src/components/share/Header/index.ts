import useLoaction from '../../../hooks/useLocation';
import { VDomType } from '../../../types';
import Button from '../Button';

function Header(): VDomType {
  const { navigate } = useLoaction();

  return {
    type: 'div',
    props: {
      class:
        'w-full fixed flex gap-[12px] justify-center items-center top-0 p-[32px]',
    },
    children: [
      Button({
        onClick: () => navigate('/record'),
        children: ['Go to Record'],
      }),
      Button({ onClick: () => navigate('/'), children: ['Home'] }),
      Button({
        onClick: () => navigate('/record'),
        children: ['Record'],
      }),
    ],
  };
}

export default Header;
