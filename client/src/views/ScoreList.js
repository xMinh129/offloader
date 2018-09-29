import React, { Component } from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import { Card } from "../components/Card.jsx";
import Button from "../components/CustomButton.jsx";
import ScoreTable from "./ScoreTable";
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
import {style} from "../variables/Variables.jsx";

class ScoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankedData: this.props.newState.rankedData,
            _notificationSystem: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem})
    }

    handleClick(){
        var level = 'success'; // 'success', 'warning', 'error' or 'info'

        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Email successfully sent
                </div>
            ),
            level: level,
            position: 'bc',
            autoDismiss: 15,
        });
    }

    refresh(){
        var self = this;
        axios.post("http://0.0.0.0:5010/api/update_ranklist", {
            ranklist: self.state.rankedData
        })
            .then(function (response) {
                let rankedData = response.data;
                console.log(rankedData);
                self.setState({rankedData: rankedData});
                self.props.updateState(self.state);
                self.props.history.push('/ranked_passengers');
            }).catch(error => {
            console.log(error);
        });
    }

    overbookWarning(){
        return (<Button
                bsStyle="danger" fill style={{height:'50px', width: '200px'}}>
                Need to Offload!
            </Button>)
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change)
    }

    render() {
        if (this.state.rankedData !== null) {
            let {total_booked, checked_in, flight_capacity} = this.state.rankedData;
            return (
                <div className="content">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Grid fluid>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <Card
                                    title="Basic Information"
                                    content={
                                        <form>
                                            <ScoreTable
                                                updateState={this.props.updateState}
                                                newState={this.state.rankedData.ranked_passengers}
                                                successNotification={() => this.handleClick}
                                            />
                                            <br/>
                                            <p>Total seats of the flight: {flight_capacity}</p>
                                            <p>Total seats of the flight: {total_booked}</p>
                                            <p>Number of passengers checked in/on the taxi: {checked_in}</p>
                                            <p>Available seats left: <strong>{flight_capacity - checked_in}</strong></p>
                                            {
                                                flight_capacity - checked_in < 0 ? (
                                                    <div>{this.overbookWarning()}</div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                            <br/>
                                            <Button bsStyle="info" pullRight fill name="submit"
                                                    onClick={this.handleClick.bind(this, 'bc')}>
                                                Send Email
                                            </Button>
                                            <Button bsStyle="info" pullRight fill name="submit"
                                                    onClick={this.refresh}>
                                                Refresh
                                            </Button>
                                            <div className="clearfix"/>
                                        </form>
                                    }
                                />
                            </Col>
                            <Col md={1}>
                            </Col>
                        </Row>
                    </Grid>

                </div>
            );
        }
        else {
            return (
                <div>Loading</div>
            )
        }
    }
}

export default withRouter(ScoreList);