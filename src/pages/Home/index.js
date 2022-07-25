import Bar from '@/components/Bar'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
// import { observer } from 'mobx-react-lite'


const Home = () => {

  const [yArticle, setyArticleList] = useState({ count: 0 })
  const loadData = async () => {
    const res = await http.get('/mp/articles')
    const { total_count } = res.data
    setyArticleList({
      count: total_count
    })
    console.log(res)

    // const { aaa } = res.data.result.map(item => item.status)
    // console.log(aaa)
  }
  useEffect(() => {
    loadData()
  }, [])

  const xdata = ['draft', 'pending', 'approved', 'failed']

  let ydata = [0, 0, yArticle.count, 0]


  // console.log(yArticle.count)



  return <div>
    <Bar title='Article Data' xData={xdata} yData={ydata} style={{ width: '500px', height: '400px' }} />

  </div>
}


export default Home

// ${ article.count }