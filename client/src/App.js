import React from "react";
import io from "socket.io-client";
import Iframe from 'react-iframe';
import IdleTimer from 'react-idle-timer'
import './App.css';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            display: "block",
            hidder: true,
            height: 0,
            x: 0,
            y: 0,
            xx: 0,
            yy: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.idleTimer = null;
        this.socket = io('localhost:5000');

        this.sendCoordinates = ev => {
            this.socket.emit(
              'SEND_COORDINATES', {
              x: this.state.x,
              y: this.state.y,
            })

        }
    }

    _onAction = (e) => {
      console.log('user did something', e)
     }

     _onActive = (e) => {
       console.log('time remaining', this.idleTimer.getRemainingTime())
     }

     _onIdle =(e) => {
       console.log("iddle");
       this.socket.emit('PAUSE_COORDINATES')
     }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight });
    }

    _onMouseMove = (e) => {
      this.setState({ x: e.screenX, y: e.screenY });
      this.sendCoordinates();
    }




    render(){

      let style_clicker = {
          position: "absolute",
          left: this.state.xx,
          top:this.state.yy,
          zIndex: 100000
      }


      let display = {
        display: this.state.display
      }


        return (
          <div>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={100} />
            <div className="container"
              style={{backgroundColor: "white"}}
              onMouseMove={this._onMouseMove}>
            </div>
          </div>
        )
    }
}

export default App;
