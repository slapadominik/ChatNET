import React from 'react';
import './Message.css';

const Message = ({ from, content, isAuthor, date }) => {
  const authorMsg = (msg) => {
    return (
      <div className="col-md-5 offset-md-7 col-6 offset-6">
        <span className="text-secondary ml-4">{from}</span>
        <div className="card bg-primary">
          <div className="card-body">
            <span className="card-text text-white">{msg}</span>
          </div>
        </div>
        <span className="text-secondary float-right mr-4">
          {new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    );
  };

  const otherUserMsg = (msg) => {
    return (
      <div className="col-md-5 col-6">
        <span className="text-secondary ml-3">{from}</span>
        <div className="card bg-light">
          <div className="card-body">
            <span className="card-text">{msg}</span>
          </div>
        </div>
        <span className="text-secondary float-right mr-4">
          {new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="row mt-1">
      {isAuthor ? authorMsg(content) : otherUserMsg(content)}
    </div>
  );
};

export default Message;
