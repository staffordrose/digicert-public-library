import { forwardRef, useMemo, useState } from 'react';
import type { ForwardedRef, ReactNode } from 'react';
import styled from 'styled-components';
import { BiChevronDown } from 'react-icons/bi';
import { toKebabCase } from '../../utils';
import { Button, Disclosure, Flex } from '../atoms';

interface AccordionItemHeadingProps {
  isOpen: boolean;
}

const AccordionItemHeading = styled.h3<AccordionItemHeadingProps>`
  & > button {
    justify-content: space-between;
    width: 100%;

    & > svg {
      transform: ${({ isOpen }) => `rotate(${isOpen ? '180deg' : '0deg'})`};
      transition: transform 300ms ease;
    }
  }
`;

interface AccordionItemBodyProps {
  mb?: string | number;
}

const AccordionItemBody = styled.div<AccordionItemBodyProps>`
  margin-bottom: ${({ theme, mb }) =>
    mb ? (typeof mb === 'number' ? theme.space[mb] : mb) : 0};
  padding: ${({ theme }) => theme.space[4]};
`;

interface AccordionItemProps {
  title: string;
  initialIsOpen?: boolean;
  mb?: number;
  children: ReactNode;
}

function AccordionItem({
  title,
  initialIsOpen = true,
  mb,
  children,
}: AccordionItemProps) {
  const [isOpen, setOpen] = useState(initialIsOpen);

  const toggleOpen = () => setOpen(!isOpen);

  const id = useMemo(() => toKebabCase(title).slice(0, 30), [title]);

  return (
    <>
      <AccordionItemHeading isOpen={isOpen}>
        <Button
          size='lg'
          id={`${id}-control`}
          aria-controls={`${id}-section`}
          onClick={toggleOpen}
        >
          <span>{title}</span>
          <BiChevronDown />
        </Button>
      </AccordionItemHeading>

      <Disclosure isOpen={isOpen} duration={500}>
        <AccordionItemBody
          id={`${id}-section`}
          role='region'
          aria-labelledby={`${id}-control`}
          mb={mb}
        >
          {children}
        </AccordionItemBody>
      </Disclosure>
    </>
  );
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const Accordion = forwardRef(
  ({ items }: AccordionProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Flex ref={ref} flexDir='column' gap={8}>
        {Array.isArray(items) &&
          items.length > 0 &&
          items.map((item, index) => (
            <AccordionItem key={index + item.title} {...item} />
          ))}
      </Flex>
    );
  }
);

export default Accordion;
