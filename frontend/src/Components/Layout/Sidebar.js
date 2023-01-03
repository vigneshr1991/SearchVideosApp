
import React, { useState } from "react";
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;
    height: 100%;
    width: 75px;
    z-index: 1;
    background-color: #222;
    overflow-x: hidden;
    padding-top: 10px;
`;

const NavItems = [
    {
        path: '/',
        name: 'Videos',
        icon: 'fa fa-fw fa-home',
        key: 1
    },
    {
        path: '/NoMatch',
        name: 'NoMatch',
        icon: 'fas fa-hashtag',
        key: 2
    }
]

const SideNav = (props) => {
    const [activePath, setActivePath] = useState(props.location.pathname);
    const [items] = useState(NavItems);

    return(
        <StyledSideNav>
            {
                items.map((item) => {
                    return (
                        <NavItem 
                            path={item.path}
                            name={item.name}
                            icon={item.icon}
                            onItemClick={path => setActivePath(path)}
                            active={item.path === activePath}
                            key={item.key}
                        />
                    );
                })
            }
        </StyledSideNav>
    );
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 75px;
    text-align: center;
    margin-bottom: 0;
    a {
        font-size: 2.7em;
        color: ${(props) => props.active ? "#FFF" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none;
        }  
    }
`;

const NavIcon = styled.div`
`;

const NavItem = (props) => {
    const handleClick = () => {
        const { path, onItemClick } = props;
        onItemClick(path);
    }

    const { active } = props;
    return(
        <StyledNavItem active={active}>
            <Link to={props.path} className={props.icon} onClick={handleClick}>
                <NavIcon />
            </Link>
        </StyledNavItem>
    );
}

const Sidebar = (props) => {
    return (
        <RouterSideNav />
    );
}

export default Sidebar;