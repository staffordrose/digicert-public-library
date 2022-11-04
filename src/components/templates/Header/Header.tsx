import { BiBookAdd, BiLibrary } from 'react-icons/bi';
import { useSmallScreenMediaQuery } from '../../../hooks';
import { ButtonLink } from '../../atoms';
import { StyledHeader } from './styles';

export default function Header() {
  const isSmallScreen = useSmallScreenMediaQuery();

  return (
    <StyledHeader>
      <div>
        <nav>
          <ul>
            <li>
              <ButtonLink size='lg' aria-label='Go to catalog' to='/'>
                <BiLibrary />
                <span>Library</span>
              </ButtonLink>
            </li>
            <li>
              {isSmallScreen ? (
                <ButtonLink isSquare aria-label='Add book to catalog' to='/add'>
                  <BiBookAdd />
                </ButtonLink>
              ) : (
                <ButtonLink aria-label='Add book to catalog' to='/add'>
                  <BiBookAdd />
                  <span>Book</span>
                </ButtonLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
}
