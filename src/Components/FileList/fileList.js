import styled from 'styled-components';

export const Container = styled.ul `
    margin-top: 20px;
    

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;

        & + li {
            margin-top:15px;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 20px;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 12px;
            color: #999; 
            margin-top: 5px;

            button {
                border: 0;
                background-color: #e57878;
                margin-left: 5px;
                cursor: pointer;
                color: #FFFFFF;
                padding: 5px;
            }
        }

    }
`;
export const Preview = styled.div`

    width: 70px;
    height: 70px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
    
`;
