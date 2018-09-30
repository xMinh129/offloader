import React, { Component } from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import { Card } from "../components/Card.jsx";
import Button from "../components/CustomButton.jsx";
import Table from './Table';
import axios from 'axios';
import ScoreTable from "./ScoreTable";

class PassengerList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.getRankedList = this.getRankedList.bind(this);
    }

    getRankedList(){
        var self = this;
        axios.get("http://0.0.0.0:5010/api/ranked_passengers")
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

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change)
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                            <Card
                                title="Basic Information"
                                content={
                                    <form>
                                        <Table
                                            updateState={this.props.updateState}
                                            newState={this.props.newState}
                                        />
                                        <br/>
                                        <br/>
                                        <br/>
                                        <Button bsStyle="info" pullRight fill name="submit"
                                                onClick={this.getRankedList}>
                                            Get Ranked Passenger List
                                        </Button>
                                        <div className="clearfix" />
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
}

export default withRouter(PassengerList);