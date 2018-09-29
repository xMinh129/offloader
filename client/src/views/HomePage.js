import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {Card} from "../components/Card.jsx";
import {FormInputs} from "../components/FormInputs.jsx";
import Button from "../components/CustomButton.jsx";

class PassengerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightNumber: '',
            data: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    submitAndRequestData() {
        var self = this;
        axios.get("http://0.0.0.0:5010/api/passengers" + '?flightNumber=' + this.state.flightNumber)
            .then(function (response) {
                let data = response.data;
                console.log(data);
                self.setState({data: data});
                self.props.updateStep(self.state);
                self.props.history.push('/1');
            }).catch(error => {
                console.log("There's an error calling backend with axios");
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
                        <Col md={4}>
                        </Col>
                        <Col md={4}>
                            <Card
                                title="Getting Started"
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Flight Number",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "ABC1234",
                                                    value: this.state.flightNumber,
                                                    name: "flightNumber",
                                                    onChange: this.handleChange
                                                },
                                            ]}
                                        />
                                        <Button bsStyle="info" pullRight fill name="submit"
                                                onClick={this.submitAndRequestData.bind(this, 'bc')}>
                                            Retrieve Passenger List
                                        </Button>
                                    </form>
                                }
                            />
                        </Col>
                        <Col md={4}>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default withRouter(PassengerList);