import Bar from '@/components/Bar'

const Home = () => {
  return <div>
    <Bar title='first bar' xData={['1', '2', '3', '4']} yData={[20, 50, 15, 60]} style={{ width: '500px', height: '400px' }} />
    <Bar title='second bar' xData={['1', '2', '3', '4']} yData={[20, 80, 15, 60]} style={{ width: '300px', height: '200px' }} />
  </div>
}


export default Home

