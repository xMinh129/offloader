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
import { UserCard } from "../components/UserCard.jsx";
import Button from "../components/CustomButton.jsx";

import avatar from "../assets/img/faces/face-3.jpg";

class Registration2 extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={8}>
                            <Card
                                title="Who You Are"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-5"]}
                                            proprieties={[
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-5"]}
                                            proprieties={[
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email"
                                                }
                                            ]}
                                        />
                                    </form>
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

export default Registration2;
