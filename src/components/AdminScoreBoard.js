import React, { Component } from "react";

import '../styles/AdminScoreBoard.css';
// import Popup from "./Popup";
import BatsmanSection from '../components/BatsmanSection';
import OversSection from '../components/OversSection';

class AdminScoreBoard extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  // socket data
                  team1: {
                        name: '',
                        logo: '',
                        wonToss: false,
                        isBatting: true,
                        runs: 0,
                        wickets: 0,
                        ballsFaced: 0
                  },
                  team2: {
                        name: '',
                        logo: '',
                        wonToss: false,
                        isBatting: true,
                        runs: 0,
                        wickets: 0,
                        ballsFaced: 0
                  },
                  inningId: 1,
                  heading: '',
                  striker: {
                        id: 0,
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0
                  },
                  nonStriker: {
                        id: 0,
                        name: '',
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0
                  },
                  bowler: {
                        id: 0,
                        name: '',
                        runsGiven: 0,
                        overs: 0.0,
                        maiden: 0,
                        wickets: 0
                  },
                  overArray: Array(6).fill(0),

                  // extra data needed
                  battingTeamPlayers: [],
                  bowlingTeamPlayers: [],
                  totalRuns: 0,
                  wickets: 0,
                  totalOvers: 0,
                  isWicket: false,
                  changePlayer: false,
                  inningEnd: false
            }
      }

      componentDidMount() {
            const { inningId, striker, nonStriker, totalOvers, tossResult, battingTeam, team1, team2, team1Players, team2Players, socket } = this.props;

            // Event - inningStart
            // socket.emit('nextScreen', {
            //       inningId,
            //       strikerId: striker.id,
            //       nonStrikerId: nonStriker.id,
            // });

            let battingTeamPlayers, bowlingTeamPlayers;

            if (battingTeam === 1) {
                  battingTeamPlayers = team1Players;
                  bowlingTeamPlayers = team2Players;
            } else {
                  battingTeamPlayers = team2Players;
                  bowlingTeamPlayers = team1Players;
            }

            let heading = (tossResult === 1) ?
                  `${team1} won the toss and elected to do ${(battingTeam === 1) ? 'batting' : 'fielding'}.`
                  :
                  `${team2} won the toss and elected to do ${(battingTeam === 2) ? 'batting' : 'fielding'}.`;

            let teamOne = {
                  name: team1,
                  logo: '',
                  wonToss: (tossResult === 1),
                  isBatting: (battingTeam === 1),
                  runs: 0,
                  wickets: 0,
                  ballsFaced: 0
            };
            let teamTwo = {
                  name: team2,
                  logo: '',
                  wonToss: (tossResult === 2),
                  isBatting: (battingTeam === 2),
                  runs: 0,
                  wickets: 0,
                  ballsFaced: 0
            }

            this.setState({ battingTeamPlayers, bowlingTeamPlayers, heading, team1: teamOne, team2: teamTwo, totalOvers });
      }

      setBatsmenDetails(striker, nonStriker) {
            this.setState({ striker, nonStriker });
      }

      updateRuns(addRuns) {
            let { totalRuns, striker, nonStriker } = this.state;
            totalRuns = totalRuns + addRuns;
            striker.runs = striker.runs + addRuns;
            striker.balls = striker.balls + 1;
            if (totalRuns % 2 !== 0) {
                  this.setState({ striker: nonStriker, nonStriker: striker, totalRuns });
            } else {
                  this.setState({ totalRuns, striker });
            }
      }

      setWicket(isWicket) {
            this.setState({ isWicket });
      }

      updateWickets(addWicket) {
            let { wickets } = this.state;
            wickets = wickets + addWicket;
            this.setState({ wickets });
      }

      // setEndGame() {
      //       this.setState({ endGame: true });
      // }

      render() {
            const { team1, team2, battingTeam } = this.props;
            const { battingTeamPlayers, bowlingTeamPlayers } = this.state;
            return (
                  <div className="admin-scoreboard">
                        <div className="scoreboard-header">
                              <b>Admin Score Board</b>
                        </div>
                        <div className="admin-teams">
                              <div className="team" id="team-1" style={{ backgroundColor: '#66ccff' }}>
                                    <img src={(battingTeam === 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team1} />
                                    <h4>&nbsp;&nbsp;&nbsp;{team1}</h4>
                              </div>
                              <div className="team" id="team-2" style={{ backgroundColor: '#ccccff' }}>
                                    <img src={(battingTeam !== 1) ? require('../images/team1.png') : require('../images/team2.png')} width="50" height="50" className="team-logo" alt={team2} />
                                    <h4>&nbsp;&nbsp;&nbsp;{team2}</h4>
                              </div>
                        </div>
                        <div className="toss-win">
                              <span>{this.state.heading}</span>
                        </div>

                        {
                              (!this.state.endGame) ?
                                    <div className="scoreboard-body">
                                          <div className="scores-section">
                                                <div className="section-header">
                                                      <span>Scores Section</span>
                                                </div>
                                                <div className="section-body">
                                                      <div className="runs">
                                                            <span>Runs:&nbsp;&nbsp;&nbsp;</span>
                                                            <div className="score">{this.state.totalRuns}</div>
                                                      </div>
                                                      <div className="wickets">
                                                            <span>Wickets:&nbsp;&nbsp;&nbsp;</span>
                                                            <div className="score">{this.state.wickets}</div>
                                                      </div>
                                                </div>
                                          </div>
                                          <BatsmanSection
                                                striker={this.state.striker}
                                                nonStriker={this.state.nonStriker}
                                                battingTeamPlayers={battingTeamPlayers}
                                                setBatsmenDetails={this.setBatsmenDetails.bind(this)}
                                                isWicket={this.state.isWicket}
                                                setWicket={this.setWicket.bind(this)}
                                                updateWickets={this.updateWickets.bind(this)}
                                          />
                                          <OversSection
                                                striker={this.state.striker}
                                                nonStriker={this.state.nonStriker}
                                                totalOvers={this.state.totalOvers}
                                                bowlingTeamPlayers={bowlingTeamPlayers}
                                                setBatsmenDetails={this.setBatsmenDetails.bind(this)}
                                                updateRuns={this.updateRuns.bind(this)}
                                                setWicket={this.setWicket.bind(this)}
                                          />
                                    </div>
                                    :
                                    <div className="scoreboard-body">
                                    </div>
                        }

                  </div>
            );
      }
}

export default AdminScoreBoard;