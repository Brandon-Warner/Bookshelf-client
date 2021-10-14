import React from 'react';
// import { ToastNotification } from 'carbon-components-react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './Notification.css';

const Notification = ({ message, type, showNotification }) => {
    console.log('message: ', message);
    console.log('type: ', type);
    console.log('showNotification: ', showNotification);

    return (
        <CSSTransition classNames='notification' in={showNotification} timeout={5000} unmountOnExit>
            {status => {
                return (
                    <MyNotification status={status} type={type}>
                        {message}
                    </MyNotification>
                );
            }}
        </CSSTransition>
    );
};

const MyNotification = styled.div`
    position: fixed;
    align-item: right;
    width: 500px;
    margin-right: 0px;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    background-color: ${props => (props.type === 'success' ? '#249410' : '#c43737')};
    font-size: 24px;
    font-weight: bold;
    color: #eee;
    z-index: 1000;
`;
export default Notification;
