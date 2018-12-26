import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client';
// import axios from 'axios';

import '../styles/Admin.css';

import Teams from '../components/Teams';
import TeamPlayers from '../components/TeamPlayers';
import DisplayTeams from '../components/DisplayTeams';
import TossResults from '../components/TossResults';
import AdminScoreBoard from '../components/AdminScoreBoard';
import Login from '../components/Login';

// import conf from '../conf';

class Admin extends Component {
  constructor(props) {
    super(props);
    // const endpoint = 'http://127.0.0.1:4001';
    // const socket = socketIOClient(endpoint);

    this.state = {
      pageComponent: 1,
      currentTeam: 1,
      team1: 'Mumbai',
      team2: 'Pune',
      team1Players: Array(16).fill(null).map(() => ({ name: '' })),
      team2Players: Array(16).fill(null).map(() => ({ name: '' })),
      tossResult: 0,
      battingTeam: 0,
      totalOvers: 0
      // socket,

    }
  }

  componentDidMount() {
    // const { socket } = this.state;
    // socket.on('initialize', pageComponent => {
    //   console.log('Page Component : ', pageComponent);
    //   this.setState({ pageComponent });
    // });
  }

  prevScreen() {
    let {
      pageComponent,
      // socket
    } = this.state;
    // No of screens
    // let n = 6;
    if (pageComponent === 0) {
      pageComponent = -1;
    }
    this.setState({
      pageComponent: pageComponent - 1,
    });

    // Send sockent message for next screen
    // socket.emit('nextScreen', pageComponent + 1);
  }

  nextScreen() {
    let {
      pageComponent,
      // socket
    } = this.state;
    // No of screens
    let n = 6;
    if (pageComponent === n) {
      pageComponent = -1;
    }
    this.setState({
      pageComponent: pageComponent + 1,
    });

    // Send sockent message for next screen
    // socket.emit('nextScreen', pageComponent + 1);
  }

  changeTeamName(teamName) {
    this.setState({
      ...teamName,
    });
  }

  setTotalOvers(totalOvers) {
    this.setState({ totalOvers: totalOvers.totalOvers });
  }

  setTeamPlayers(teamId, teamName, teamPlayers) {
    // const url = `${conf.base_url}apis/createteam`;
    // axios.post(
    //   url,
    //   {
    //     teamName,
    //     teamId,
    //     teamPlayers,
    //     totalOvers: this.state.totalOvers
    //   })
    //   .then(res => {
    //     console.log('Res : ', res);
    //   })
    //   .catch(err => console.log('Error : ', err));
    if (teamId === 1) {
      this.setState({ team1Players: teamPlayers });
    } else {
      this.setState({ team2Players: teamPlayers });
    }
    this.nextScreen();
  }

  setTossResults() {
    // const { tossResult, battingTeam } = this.state;
    // const url = `${conf.base_url}apis/toss`;
    // const decision = (tossResult === battingTeam) ? '0' : '1';
    // axios.post(
    //   url,
    //   {
    //     teamid: tossResult,
    //     battingTeam,
    //     decision,
    //   }
    // )
    this.nextScreen();
  }

  renderComponent() {
    const { team1, team2, team1Players, team2Players, tossResult, battingTeam } = this.state;
    switch (this.state.pageComponent) {
      case 0: {
        return (
          <Login
            nextScreen={() => this.nextScreen()}
          />
        )
      }
      case 1: {
        return (
          <Teams
            team1={team1}
            team2={team2}
            nextScreen={() => this.nextScreen()}
            changeTeamName={(teamName) => this.changeTeamName(teamName)}
            setTotalOvers={(totalOvers) => this.setTotalOvers(totalOvers)}
          />
        );
      }
      case 2: {
        return (
          <TeamPlayers
            teamNo={1}
            teamName={this.state.team1}
            setTeamPlayers={teamPlayers => this.setTeamPlayers(1, team1, teamPlayers)}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 3: {
        return (
          <TeamPlayers
            teamNo={2}
            teamName={this.state.team2}
            setTeamPlayers={teamPlayers => this.setTeamPlayers(2, team2, teamPlayers)}
            prevScreen={() => this.prevScreen()}
          />
        )
      }
      case 4: {
        return (
          <DisplayTeams
            team1={team1}
            team2={team2}
            team1Players={team1Players}
            team2Players={team2Players}
            nextScreen={() => this.nextScreen()}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 5: {
        return (
          <TossResults
            team1={team1}
            team2={team2}
            setTossData={data => this.setState({ ...data })}
            setTossResults={() => this.setTossResults()}
            prevScreen={() => this.prevScreen()}
          />
        );
      }
      case 6: {
        return (
          <AdminScoreBoard
            team1={team1}
            team2={team2}
            totalOvers={this.state.totalOvers}
            team1Players={team1Players}
            team2Players={team2Players}
            tossResult={tossResult}
            battingTeam={battingTeam}
            socket={this.state.socket}
          />
        );
      }
      default: {
        return (
          <Teams />
        );
      }
    }
  }

  render() {
    return (
      <div className="admin">
        <div className="admin-header">
          <h2>Kalva-Pen Tennis Cricket Association</h2>
        </div>
        <div className="admin-body">
          <div className="admin-card">
            {this.renderComponent()}
          </div>
        </div>
      </div>
    );
  }

}

export default Admin;