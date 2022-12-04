import {Header} from '../components/Header';
import { Container } from 'reactstrap';
import React from 'react';
type Props = {
    children: JSX.Element,
  };
export const CommandPageContainer : React.FC<Props>=({children})=>{
    return (
        <>
        <Container>
           <Header/>
           {children}
        </Container>
        </>
    )
}