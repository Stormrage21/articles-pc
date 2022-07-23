import Bar from '@/components/Bar'
import { useEffect, useState, useRef } from 'react'
import { http } from '@/utils'
// import { observer } from 'mobx-react-lite'


const Home = () => {

  const [yArticle, setyArticleList] = useState({ count: 0 })
  const loadData = async () => {
    const res = await http.get('/mp/articles',)
    const { total_count } = res.data
    setyArticleList({
      count: total_count
    })
    console.log(res)

    // const { aaa } = res.data.result.map(item => item.status)
    // console.log(aaa)
  }
  useEffect(() => {
    loadData({ page: 1, page: 2 })
  }, [])

  const xdata = ['draft', 'pending', 'approved', 'failed']

  let ydata = [0, 0, yArticle.count, , 0]


  // console.log(yArticle.count)



  return <div>
    <Bar title='Article Data' xData={xdata} yData={ydata} style={{ width: '500px', height: '400px' }} />
    {/* <Bar title='second bar' xData={['1', '2', '3', '4']} yData={[20, 30, 40, 50]} style={{ width: '400px', height: '300px' }} /> */}
  </div>
}


export default Home

// ${ article.count }