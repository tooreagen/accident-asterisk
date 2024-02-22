import { styled } from "styled-components";

export const AccidentAddPageStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.p`
  margin-bottom: 10px;
  padding: 7px;
  text-align: center;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 500;
  color: #e6e6fa;
  background-color: #d32f2f;
`;

export const AdressesListWrapper = styled.div`
  display: flex;
  gap: 20px;
  /* justify-content: space-evenly; */
`;

export const SelectedListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  background-color: white;
`;

export const SelectedListHeader = styled.p`
  padding: 5px;
  text-align: center;
  background-color: #e6e6fa;
`;

export const Footer = styled.div`
  display: flex;
  gap: 20px;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

export const SelectSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OperatorSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 5px;
  width: 245px;
`;
