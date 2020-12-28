import React from 'react';
import './Message.css';


const Message = ({ from, content, isAuthor }) => {
  const authorMsg = (msg) => {
    return (
      <div className="col-md-6 offset-md-6 col-6 offset-6">
        <div className="card h-100 bg-primary">
          <div className="card-body">
            <span className="card-text text-white">{msg}</span>
          </div>
        </div>
      </div>
    );
  };

  const otherUserMsg = (msg) => {
    return (
      <div className="col-md-6 col-6">
        <span className="text-secondary">{from}</span>
        <div className="card bg-light">
          <div className="card-body">
            <span className="card-text">{msg}</span>
          </div>
        </div>
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
