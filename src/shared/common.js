import styled from 'styled-components';

export const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 5px;
`
export const CardRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const Result = styled.p`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin: 5px;
`

export const CardDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px auto;
`

export const Name = styled.div`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
`

export const Content = styled.div`
    height: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Data = styled.div`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: #000000;
    margin: 8px 0 0 0;
`
export const FormField = styled.div`
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 0 20px 0px;
`
export const Nav = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
    background: #212121;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
`;