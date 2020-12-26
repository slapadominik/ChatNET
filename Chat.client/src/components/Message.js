import React from 'react';

const Message = ({ from, content, isAuthor }) => {
  const getUserName = () => {
    if (isAuthor) {
      return (
        <span className="text-white">
          <b>Me:</b>
        </span>
      );
    }
    return (
      <span>
        <b>{from}: </b>
      </span>
    );
  };

  const authorMsg = (msg) => {
    return (
        <div className="col-md-6 offset-md-6">
          <div className="card h-100 bg-primary">
            <div className="card-body">
              <span className="card-text text-white">
                {getUserName()} {msg}
              </span>
            </div>
          </div>
        </div>
    );
  };

  const otherUserMsg = (msg) => {
    return (
        <div className="col-md-6">
          <div className="card h-100 bg-light">
            <div className="card-body">
              <span className="card-text">
                {getUserName()} {msg}
              </span>
            </div>
          </div>
        </div>
    );
  };

  return <div className="row mt-1">{isAuthor ? authorMsg(content) : otherUserMsg(content)}</div>;
};

export default Message;
