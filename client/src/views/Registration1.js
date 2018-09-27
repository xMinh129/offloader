import React, { Component } from "react";
import {Grid, Row, Col} from "react-bootstrap";
import { Card } from "../components/Card.jsx";
import { FormInputs } from "../components/FormInputs.jsx";
import Button from "../components/CustomButton.jsx";
import { DescriptionError } from "../data/ErrorMessages"
import {style} from "../variables/Variables.jsx";

class Registration1 extends Component {
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
                        <Col md={2}>
                        </Col>
                        <Col md={8}>
                            <Card
                                title="Basic Information"
                                content={

                                }
                            />
                        </Col>
                        <Col md={2}>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default Registration1;