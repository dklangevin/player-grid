import Link from 'next/link';
import styled, { css } from 'styled-components';

export default function Button({
  children,
  href,
  appearance = 'primary',
  loading,
  ...props
}) {
  return href ? (
    <Link href={href}>
      <Container appearance={appearance} {...props}>
        {children}
      </Container>
    </Link>
  ) : (
    <Container appearance={appearance} {...props}>
      {children}
    </Container>
  );
}

const Container = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  line-height: 30px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;

  ${({ appearance }) =>
    appearance === 'primary'
      ? css`
          background: #66aa66;
        `
      : appearance === 'secondary' &&
        css`
          background: none;
          border: 2px solid grey;
        `}
`;
