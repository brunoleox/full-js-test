import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    div{
        display: flex;
        flex-direction: column;
        position: relative;
    }

    button {
        margin: 10px 0px;
    }
`

export const Result = styled.div`
    margin: 20px 0;
    
    ul {
        list-style: none;

        li{
            color: #515151;
            padding: 10px 5px;
            background-color: #FFF;
            margin-top: 5px;
        }
    }       
        
    table {
        border: 1px solid #c1c1c1;
        margin: 5px 0;
        width: 100%;
        text-align: center;
        padding: 5px;

        tr {
            td {
                width: 10vw;
            }
        }
    }


    

`