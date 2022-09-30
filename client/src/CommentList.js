import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = Array.isArray(comments) ? comments.map((comment) => {
    let content;

    // check moderation status and display respective content
    switch(comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation'
        break;
      case 'rejected':
        content = 'This comment has been rejected'
        break;
      default:
        break;
    }

    return <li key={comment.id}>{content}</li>;
  }) : null;

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
