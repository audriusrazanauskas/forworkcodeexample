import React, { useRef } from "react";
import styled from "styled-components";

export const InnerHeader = ({ label, onClick, icon }) => {
  return (
    <>
      <Button onClick={onClick}>
        {icon && <Icon src={icon} alt="icon" />}
        {label}
      </Button>
    </>
  );
};

const Button = styled.button`
  position: relative;
  height: 50px;
  border: 0px solid #e6e8ec;
  width: 100%;
  background: #8f7df8;
  color: #fff;
  border-radius: 200px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`;

const Icon = styled.img`
  height: 15px;
  margin-right: 10px;
`;
