import { FormEvent, useState } from "react";
import "./Landing.css"

export const Landing: React.FC = () => {

    const [questionInput, setQuestionInput] = useState('');
    const [systemInput, setSystemInput] = useState("You are a helpful assistant.")
    const [messages, setMessages] = useState([] as any);
    const [showSystemInput, setShowSystemInput] = useState(false);

    async function callOpenAi(userQuestion: string, userSystemChoice: string) {
        const response = await fetch('/api/ask-ai', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userQuestion,
                userSystemChoice
            })
        })
        const data = await response.json();
        if (data.openAiResponse && data.status === "Success") {
            return data.openAiResponse;
        } else {
            return "Unable to reach chatbot. An error has occurred."
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!questionInput.trim()) {
            return;
        }
        const userMessage = {
            text: questionInput,
            user: true
        }
        setMessages(
            (prevMessages: any) => [...prevMessages, userMessage]
        );
        const aiMessage = {
            text: '...',
            user: false
        };
        setMessages(
            (prevMessages: any) => [...prevMessages, aiMessage]
        );
        const response = await callOpenAi(questionInput, systemInput);

        const newAiMessage = {
            text: response,
            user: false
        };
        setMessages(
            (prevMessages: any) => [...prevMessages.slice(0, -1), newAiMessage]
        );
        setQuestionInput("");
    };

    const handlePickSystemButton = () => {
        setShowSystemInput(!showSystemInput);
    }

    const handleClearChatButton = () => {
        setMessages([]);
    }

    return (
        <>
            <div className="chatbot-container mt-5">
                <div className="chatbot-messages">
                    {messages.map((message: any, index: any) => (
                        <div
                            key={index}
                            className={`message ${message["user"] ? 'user-message' : 'ai-message'}`}
                        >
                            {message["text"]}
                        </div>
                    ))}
                </div>
                <form className="chatbot-input-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                        placeholder="Type your question..."
                    />
                    <button type="submit">Send</button>
                </form>
                <div className="chatbot-input-form gap-2 justify-content-center">
                    <button onClick={handlePickSystemButton}>Pick How The Chatbot Answers</button>
                    <button onClick={handleClearChatButton}>Clear Chat</button>
                </div>
                {showSystemInput &&
                    <div className="chatbot-input-form">
                        <input
                            type="text"
                            onChange={(e) => setSystemInput(e.target.value)}
                            placeholder="The default is: You are a helpful assistant."
                        />
                    </div>
                }
            </div>
        </>
    );
};