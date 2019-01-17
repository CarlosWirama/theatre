import styled from 'styled-components';

export default styled.div`
  position: fixed;
  font-size: 18pt;
  color: black;
  background-color: #ffe65e;
  height: 36px;
  padding: 10px;
  width: calc(100% - 20px);
  z-index: 1;
  white-space: nowrap;  
  overflow: hidden;
  text-overflow: ellipsis;
`;
