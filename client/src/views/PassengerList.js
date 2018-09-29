import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

import { Card } from "../components/Card.jsx";
import Button from "../components/CustomButton.jsx";
import { DescriptionError } from "../data/ErrorMessages"
import Table from './Table';
import ScoreTable from "./ScoreTable";

class PassengerList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.validateSubmit = this.validateSubmit.bind(this);
    }

    validateSubmit(position){
        var level = 'error'; // 'success', 'warning', 'error' or 'info'
        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    {DescriptionError}
                    {DescriptionError}
                    {DescriptionError}
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
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
                                            updateStep={this.props.updateStep}
                                            newState={this.props.newState}
                                        />
                                        <br/>
                                        <br/>
                                        <ScoreTable/>
                                        <br/>
                                        <Button bsStyle="info" pullRight fill name="submit">
                                            Dummy
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

export default PassengerList;