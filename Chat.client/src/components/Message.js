import React from 'react';

const Message = ({from, content, isAuthor}) => {
    
    const getUserName = () => {
        if(isAuthor) {
            return <span style={{color:'orange'}}><b>Me:</b></span>
        }
        return <span><b>{from}: </b></span>
    }

    return (
        <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
        <div className="card h-100">
            <div className="card-body">
                <span className="card-text">
                    {getUserName()} {content}
                </span>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Message;