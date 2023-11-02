"use client";
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Bubble from '../components/Bubble'

export default function Home() {
  const [messages, setMessages] = useState([]);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (inputRef.current.value.trim() !== "") {
      try {
        const question = inputRef.current.value;
        setMessages(prev => [...prev, { text: question, isQuestion: true }]);
        inputRef.current.value = "";
        inputRef.current.focus();
        setMessages(prev => [...prev, { processing: true }]);
        const res = await axios.post(`/api/chat`, {
          prompt: question,
        });
        const reply = JSON.parse(res.data);
        setMessages(prev => {
          return update(prev, {
            [prev.length - 1]: {
              text: {$set: reply.text},
              url: {$set: reply.url},
              processing: {$set: false}
            }
          });
        });
      } catch (err) {}
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className='chatbot-section flex flex-col origin:w-[800px] w-full origin:h-[673px] h-full rounded-md p-2 md:p-6'>
        <div className='chatbot-header pb-6'>
          <div className='flex items-center gap-2'>
            <svg width="24" height="25" viewBox="0 0 24 25">
              <path d="M20 9.96057V7.96057C20 6.86057 19.1 5.96057 18 5.96057H15C15 4.30057 13.66 2.96057 12 2.96057C10.34 2.96057 9 4.30057 9 5.96057H6C4.9 5.96057 4 6.86057 4 7.96057V9.96057C2.34 9.96057 1 11.3006 1 12.9606C1 14.6206 2.34 15.9606 4 15.9606V19.9606C4 21.0606 4.9 21.9606 6 21.9606H18C19.1 21.9606 20 21.0606 20 19.9606V15.9606C21.66 15.9606 23 14.6206 23 12.9606C23 11.3006 21.66 9.96057 20 9.96057ZM7.5 12.4606C7.5 11.6306 8.17 10.9606 9 10.9606C9.83 10.9606 10.5 11.6306 10.5 12.4606C10.5 13.2906 9.83 13.9606 9 13.9606C8.17 13.9606 7.5 13.2906 7.5 12.4606ZM16 17.9606H8V15.9606H16V17.9606ZM15 13.9606C14.17 13.9606 13.5 13.2906 13.5 12.4606C13.5 11.6306 14.17 10.9606 15 10.9606C15.83 10.9606 16.5 11.6306 16.5 12.4606C16.5 13.2906 15.83 13.9606 15 13.9606Z" />
            </svg>
            <h1 className='chatbot-text-primary text-xl md:text-2xl font-medium'>Chatbot</h1>
          </div>
          <p className="chatbot-text-secondary-inverse text-sm md:text-base mt-2 md:mt-4">Chatting with the Astra chatbot is a breeze! Simply type your questions or requests in a clear and concise manner. Responses are sourced from Astra documentation and a link for further reading is provided.</p>
        </div>
        <div className='flex-1 relative overflow-y-auto my-4 md:my-6'>
          <div className='absolute w-full'>
            {messages.map((message, index) => <Bubble ref={messagesEndRef} key={`message-${index}`} content={message} />)}
          </div>
        </div>
        <form className='flex h-[40px] gap-2' onSubmit={sendMessage}>
          <input ref={inputRef} className='chatbot-input flex-1 text-sm md:text-base outline-none bg-transparent rounded-md p-2' placeholder='Send a message...' />
          <button type="submit" className='chatbot-send-button flex rounded-md items-center justify-center px-2.5 origin:px-3'>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z" />
            </svg>
            <span className='hidden origin:block font-semibold text-sm ml-2'>Send</span>
          </button>
        </form>
      </section>
    </main>
  )
}