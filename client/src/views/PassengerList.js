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
import { FormInputs } from "../components/FormInputs.jsx";
import Button from "../components/CustomButton.jsx";
import { DescriptionError } from "../data/ErrorMessages"
import {style} from "../variables/Variables.jsx";
import Table from './Table';

class PassengerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            validation: {
                validity: false,
                errors: []
            },
        };
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

    getValidationState() {
        const length = this.state.description.length;
        if (length > 20) return 'success';
        else if (length > 13) return 'warning';
        else if (length > 0) return 'error';
        return null;
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
                                        <Button bsStyle="info" pullRight fill name="submit">
                                            Next
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