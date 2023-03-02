import React, { useRef } from "react";
import styled from "styled-components";

export const SideModal = () => {
  return (
    <>
      <Wrapper>Side Modal</Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 80px;
  border-bottom: 1px solid #e6e8ec;
  width: 100%;
  background: #fff;
`;
