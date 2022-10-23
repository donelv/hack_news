import axios from 'axios'

const baseURL = 'https://hacker-news.firebaseio.com/v0/'
const latestNews = `${baseURL}newstories.json`
export const newsApi = {
  async getNewsId() {
    const result = await axios.get(latestNews).then((data) => data.data)
    return result
  },
  async getInfoById(id) {
    const result = await axios
      .get(`${baseURL}/item/${id}.json`)
      .then((data) => data.data)
    return result
  },
}
