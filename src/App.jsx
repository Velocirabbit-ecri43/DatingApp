import React from 'react' 
import ReactDOM from 'react-dom'
import Login from './components/Login.js'


const App = () => {
  return  (
    <div>
      <h1>Dating App</h1>
      <Login/>
    </div>
);

};

ReactDOM.render(<App />, document.getElementById('root'))
export default App;