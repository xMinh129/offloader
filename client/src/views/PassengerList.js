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
                        <Col md={2}>
                        </Col>
                        <Col md={8}>
                            <Card
                                title="Basic Information"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-5", "col-md-3", "col-md-4"]}
                                            proprieties={[
                                                {
                                                    label: "Company (disabled)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Company",
                                                    defaultValue: "Creative Code Inc.",
                                                    disabled: true
                                                },
                                                {
                                                    label: "Username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Username",
                                                    defaultValue: "michael23"
                                                },
                                                {
                                                    label: "Email address",
                                                    type: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-6", "col-md-6"]}
                                            proprieties={[
                                                {
                                                    label: "First name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "First name",
                                                    defaultValue: "Mike"
                                                },
                                                {
                                                    label: "Last name",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Last name",
                                                    defaultValue: "Andrew"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Adress",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Home Adress",
                                                    defaultValue:
                                                        "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                            proprieties={[
                                                {
                                                    label: "City",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "City",
                                                    defaultValue: "Mike"
                                                },
                                                {
                                                    label: "Country",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Country",
                                                    defaultValue: "Andrew"
                                                },
                                                {
                                                    label: "Postal Code",
                                                    type: "number",
                                                    bsClass: "form-control",
                                                    placeholder: "ZIP Code"
                                                }
                                            ]}
                                        />

                                        <Row>
                                            <Col md={12}>

                                            </Col>
                                        </Row>
                                        <FormGroup controlId="formControlsTextarea"
                                                   validationState={this.getValidationState()}>
                                            <ControlLabel>About Me</ControlLabel>
                                            <FormControl
                                                rows="5"
                                                componentClass="textarea"
                                                bsClass="form-control"
                                                name="description"
                                                value={this.state.description}
                                                placeholder="Here can be your description"
                                                onChange={this.handleChange}
                                                defaultValue="I am the most awesome plumber in the world~"
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <Button bsStyle="info" pullRight fill name="submit">
                                            Next
                                        </Button>
                                        <div className="clearfix" />
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

export default PassengerList;