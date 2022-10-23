import React from 'react'
import './SingleArticle.css'
import { withRouter } from 'react-router-dom'
import { getReadableDate } from '../../mapTime'
const SingleArticle = ({ data, history }) => {
  return (
    <div
      className="singleArticle"
      onClick={() => {
        history.push(`/${data.id}`, {
          id: data.id,
        })
      }}
    >
      <p className="singleArticle_title">{data.title}</p>
      <div className="singleArticle_bottom">
        <p>Рейтинг: {data.score}</p>
        <p>Автор: {data.by}</p>
        <p>Дата публикации: {getReadableDate(data.time)}</p>
      </div>
    </div>
  )
}
export default withRouter(SingleArticle)
