import React from 'react'
import User from './components/User'


class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <User name='张三' age={28} gender={'男'}/>
      </div>
    )
  }
}
export default App

