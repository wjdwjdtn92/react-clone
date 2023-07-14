import useLoaction from '../../../hooks/useLocation';
import { VDomType } from '../../../types';
import Button from '../Button';

function Header(): VDomType {
  const { navigate } = useLoaction();

  const handleButtonClick = (url: string) => {
    navigate(url);
  };

  return {
    type: 'div',
    props: {
      class:
        'w-full fixed flex gap-[12px] justify-center items-center top-0 p-[32px]',
    },
    children: [
      Button({
        onClick: () => handleButtonClick('/record'),
        children: 'Go to Record',
      }),
      Button({ onClick: () => handleButtonClick('/'), children: 'Home' }),
      Button({
        onClick: () => handleButtonClick('/record'),
        children: 'Record',
      }),
    ],
  };
}

export default Header;
