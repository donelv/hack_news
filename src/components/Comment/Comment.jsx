import { useState } from 'react'
import './Comment.css'
const Comment = ({ data, comments, requestComments }) => {
  let [replies, setReplies] = useState(false)
  return (
    <>
      <div className="comment">
        <h3>{data.by}</h3>
        <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
        {data.kids && (
          <button
            onClick={() => {
              setReplies(!replies)
              !replies && requestComments(data.id)
            }}
            className="comment_button"
          >
            {replies ? 'Скрыть ответы' : 'Показать ответы'}
          </button>
        )}
      </div>
      {data.kids && replies && (
        <div className="replies">
          {comments.map((com) => {
            if (data.id === com.parent) {
              return (
                <Comment
                  key={com.id}
                  data={com}
                  requestComments={requestComments}
                  comments={comments}
                />
              )
            }
          })}
        </div>
      )}
    </>
  )
}
export default Comment
