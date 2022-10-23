import { useParams } from 'react-router-dom'
import './StoryPage.css'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { requestStory, requestComments } from '../../redux/story-reducer'
import { useEffect } from 'react'
import { getReadableDate } from '../../mapTime'
import Loader from '../Loader/Loader'
import Comment from '../Comment/Comment'
const StoryPage = ({ history, story, comments, isLoading, ...props }) => {
  let param = useParams()
  useEffect(() => {
    props.requestStory(param.newsId)
    props.requestComments(param.newsId)
  }, [])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="storyPage">
          <div className="storyPage_buttonsWrapper">
            <button
              onClick={() => history.push('/')}
              className="storyPage_button"
            >
              К списку новостей
            </button>

            <button
              onClick={() => props.requestStory(param.newsId)}
              className="storyPage_button"
            >
              Обновить
            </button>
          </div>

          <div className="storyPage_title">
            <h2>{story.title}</h2>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              (Перейти к источнику)
            </a>
          </div>
          <p className="storyPage_p">Автор: {story.by}</p>
          <p className="storyPage_p">
            Дата публикации: {getReadableDate(story.time)}
          </p>
          <p className="storyPage_p">
            {story.kids ? story.kids.length : '0'} комментарий
          </p>
          {comments &&
            comments.map((com) => {
              if (com.parent == param.newsId) {
                return (
                  <Comment
                    key={com.id}
                    data={com}
                    requestComments={props.requestComments}
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
let mapStateToProps = (state) => {
  return {
    story: state.storyPage.story,
    comments: state.storyPage.comments,
    isLoading: state.storyPage.isLoading,
  }
}
export default compose(
  withRouter,
  connect(mapStateToProps, {
    requestStory,
    requestComments,
  })
)(StoryPage)
