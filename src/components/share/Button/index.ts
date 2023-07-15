import { VDomType } from '../../../types';

interface ButtonProps {
  onClick: () => void;
  children?: Array<VDomType | string>;
}

function Button({ onClick, children }: ButtonProps): VDomType {
  return {
    type: 'button',
    props: {
      class:
        'text-2xl text-neutral-50 border-4 rounded-3xl border-sky-400 p-[16px] bg-sky-400 hover:text-sky-500 hover:bg-neutral-50 ',
      onClick,
    },
    children,
  };
}

export default Button;
