import styled from 'styled-components'

export const Container = styled.div`
    min-height: 100vh;
    background: linear-gradient(to right top, #65dfc9, #6cdbeb);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Card = styled.div`
    background: white;

    background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3));
    
    border-radius: 2rem;
    backdrop-filter: blur(2rem);
    display: flex;
    min-height: 80vh;
    width: 80%;
    z-index: 2;
`

export const LeftPanel = styled.div`
    align-items: center;
    border-radius: 2rem;

    background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3));

    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    
    a {
        text-decoration: none;
        color: #515052;
    }
    `
export const RightPanel = styled.div`
    flex: 3;
    `

export const Links = styled.div`
    align-items: center;
    border-radius: 1rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
    
    background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.5));

    display: flex;
    justify-content: center;
    margin: 1rem 0rem;
    padding: 1.5rem 2rem;
    width: 10rem;
`

export const InternalCard = styled.div`
    align-items: center;
    border-radius: 1rem;
    box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
    
    background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.5));

    justify-content: center;
    height: 60vh;
    margin: auto;
    margin-top: 6rem;
    padding: 1.5rem 2rem;
    width: 80%;
`