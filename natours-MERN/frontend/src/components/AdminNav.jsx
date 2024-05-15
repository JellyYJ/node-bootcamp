import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineManageAccounts } from "react-icons/md";
import { HiOutlineMap } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-green-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-green-800);
    background-color: var(--color-green-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-green-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function AdminNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/manage-tours">
            <HiOutlineMap />
            Manage tours
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/manage-users">
            <MdOutlineManageAccounts />
            Manage users
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/manage-reviews">
            <HiOutlineStar />
            Manage reviews
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/manage-bookings">
            <HiOutlineBriefcase />
            Manage bookings
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
export default AdminNav;
