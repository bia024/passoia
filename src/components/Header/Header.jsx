import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoLOreal from '../../assets/L\'Oréal.png'

const HeaderStyled = styled.header`
  background-color: #1a1a1a;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 3rem;
    margin: 0;
    padding: 0;
  }
`

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #d4af37;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #d4af37;
    
    &::after {
      width: 100%;
    }
  }
`

export default function Header () {
    return(
        <HeaderStyled>
            <Logo src={logoLOreal} alt="Logo L'Oréal" />
            <Nav>
                <ul>
                    <StyledLink to="/looks">LOOKS</StyledLink>
                    <StyledLink to="/lancamentos">LANÇAMENTOS</StyledLink>
                    <StyledLink to="/novidades">NOVIDADES</StyledLink>
                    <StyledLink to="/blackfriday">BLACKFRIDAY</StyledLink>
                </ul>  
            </Nav>
        </HeaderStyled>
    );
}
