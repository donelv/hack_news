import { useEffect, useState } from 'react'
import './NewsPage.css'
import { connect } from 'react-redux'
import { requestNews } from '../../redux/news-reducer'
import SingleArticle from '../SingleArticle/SingleArticle'
import Loader from '../Loader/Loader'
const NewsPage = (props) => {
  const [running, setRunning] = useState(false)
  useEffect(() => {
    props.requestNews()
    setRunning(true)
  }, [])
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        props.requestNews()
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [running])

  return (
    <div className="newsPage">
      <button
        className="storyPage_button"
        onClick={() => {
          props.requestNews()
        }}
      >
        Обновить
      </button>
      {props.isLoading ? (
        <Loader />
      ) : (
        props.news.map((el) => {
          return <SingleArticle data={el} key={el.id} />
        })
      )}
    </div>
  )
}
let mapStateToProps = (state) => {
  return {
    news: state.newsPage.news,
    isLoading: state.newsPage.isLoading,
  }
}
export default connect(mapStateToProps, {
  requestNews,
})(NewsPage)
