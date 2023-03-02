import React, { useEffect } from "react";
import styled from "styled-components";
import { icons } from "../../utils/icons";

export const TableSearch = ({ searchName, onChange, onClick, placeholder }) => {
  useEffect(() => {
    console.log("TableSearch component loaded");
  }, []);

  return (
    <>
      <Wrapper>
        <SearchWrapper>
          <Input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={searchName}
            onChange={onChange}
          />
          <Button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onClick}
          >
            <Icon src={icons.search2} />
          </Button>
        </SearchWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
`;
const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const Input = styled.input`
  background: #fff;
  border: 1px solid #eef0f4;
  border-radius: 200px;
  width: 100%;
  font-weight: 500;
`;
const Button = styled.button`
  display: flex;
  background: #fff;
  border: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 32px;
  border-radius: 100px;
  position: absolute;
  right: 1rem;
  transform: translateY(-50%);
  top: 50%;
  transition: 0.2s all;
  &:hover {
    background: #f8f8f8 !important;
    transition: 0.2s all;
  }
`;

const Icon = styled.img`
  height: 20px;
`;
