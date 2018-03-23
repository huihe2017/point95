import ChatBot from 'react-simple-chatbot';
import React from "react";

const steps = [
    {
        id: '0',
        message: 'Welcome to react chatbot!',
        trigger: '1',
    },
    {
        id: '1',
        message: 'Bye!',
        end: false,
    },
];

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <ChatBot steps={steps} />
            </div>
        );
    }

}

export default Chat