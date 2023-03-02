import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { icons } from "../utils/icons";
import user from "../assets/images/user.jpg";

import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    to: "/",
    icon: icons.dashboard,
  },
  {
    name: "Supplies",

    to: `/supplies`,
    icon: icons.supplies,
    /*  subMenus: [
      { name: "Courses", to: "/content/courses" },
      { name: "Videos", to: "/content/videos" },
    ], */
  },

  {
    name: "Orders",
    to: "/orders",
    icon: icons.orders,
  },
  {
    name: "Invoices",
    to: "/invoices",
    icon: icons.invoices,
  },
  {
    name: "Employees",
    to: "/employees",
    icon: icons.employees,
  },
  {
    name: "Lab",
    to: "/lab",
    icon: icons.lab,
  },

  {
    name: "Settings",
    to: "/settings",
    icon: icons.settings,
  },
  {
    name: "Admin",

    to: `/admin`,
    icon: icons.supplies,
    subMenus: [
      { name: "Orders", to: "/admin/orderlist" },
      { name: "Products", to: "/admin/products" },
      { name: "Categories", to: "/admin/categories" },
      { name: "Users", to: "/admin/userlist" },
      { name: "Suppliers", to: "/admin/suppliers" },
    ],
  },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <>
      <Wrapper className={`side-menu ${inactive ? "inactive" : ""}`}>
        <InnerWrapper>
          <Header>
            <LogoWrapper>
              <Logo src={icons.logo} alt="Dentacasa" />
            </LogoWrapper>
            <div
              onClick={() => setInactive(!inactive)}
              className="toggle-menu-btn"
            >
              {inactive ? (
                <i className="bi bi-arrow-right-square-fill">a</i>
              ) : (
                <i className="bi bi-arrow-left-square-fill">a</i>
              )}
            </div>
          </Header>
          <Menu className="main-menu">
            <MenuItems>
              {menuItems.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  name={menuItem.name}
                  exact={menuItem.exact}
                  to={menuItem.to}
                  subMenus={menuItem.subMenus || []}
                  icon={menuItem.icon}
                  onClick={(e) => {
                    if (inactive) {
                      setInactive(false);
                    }
                  }}
                />
              ))}
            </MenuItems>
          </Menu>
        </InnerWrapper>

        {/*   <div className="search-controller">
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div> */}

        {/*     <div className="divider"></div> */}

        <div className="main-menu">
          <ul>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                name={menuItem.name}
                exact={menuItem.exact}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                icon={menuItem.icon}
                onClick={(e) => {
                  if (inactive) {
                    setInactive(false);
                  }
                }}
              />
            ))}
          </ul>
        </div>

        {/*    <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  background: #fff;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  transition: width 0.2s ease-in;
  z-index: 99;
  border-right: 1px solid #e6e8ec;
  right: 0px;
  &.inactive {
    width: 80px;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #e6e8ec;
  padding: 0 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
`;
const Logo = styled.img`
  height: 30px;
`;

const Menu = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0 2rem 1rem;
  position: relative;
`;
const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export default SideMenu;
