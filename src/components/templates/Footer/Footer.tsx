import { SkeletonText } from '../../atoms';
import { StyledFooter } from './styles';

interface SkeletonListProps {
  count?: number;
}

function SkeletonList({ count = 6 }: SkeletonListProps) {
  return (
    <ul>
      {[...Array(count)].map((_, i) => {
        return (
          <li key={i}>
            <SkeletonText />
          </li>
        );
      })}
    </ul>
  );
}

function Footer() {
  return (
    <StyledFooter>
      <div>
        <div>
          <h5>Popular Categories</h5>
          <SkeletonList />
        </div>

        <div>
          <h5>Popular Authors</h5>
          <SkeletonList />
        </div>

        <div>
          <h5>Sitemap</h5>
          <SkeletonList count={4} />
        </div>
      </div>
    </StyledFooter>
  );
}

export default Footer;
