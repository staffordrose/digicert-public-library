import { useRef } from 'react';
import type { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { BiX } from 'react-icons/bi';
import theme from '../../../theme';
import { Button } from '../../atoms';
import { ModalBody, ModalHeader } from './styles';

// Bind modal to appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(12, 12, 14, 0.5)',
  },
  content: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 'auto',
    width: 280,
    height: '100%',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    backgroundColor: theme.colors.white,
    boxShadow:
      'rgba(12, 12, 14, 0.25) 0px 54px 55px, rgba(12, 12, 14, 0.12) 0px -12px 30px, rgba(12, 12, 14, 0.12) 0px 4px 6px, rgba(12, 12, 14, 0.17) 0px 12px 13px, rgba(12, 12, 14, 0.09) 0px -3px 5px',
  },
};

interface ModalProps {
  title: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

export default function Modal({
  title,
  isOpen,
  setOpen,
  children,
}: ModalProps) {
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const afterOpenModal = () => {
    initialFocusRef.current?.focus();
  };

  const closeModal = () => setOpen(false);

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={title}
    >
      <ModalHeader>
        <h2>{title}</h2>
        <Button
          ref={initialFocusRef}
          variant='outline'
          isSquare
          onClick={closeModal}
        >
          <BiX />
        </Button>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </ReactModal>
  );
}
