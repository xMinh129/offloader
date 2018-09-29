import React, { Component } from "react";
import {Grid, Row, Col} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import { Card } from "../components/Card.jsx";
import Button from "../components/CustomButton.jsx";
import ScoreTable from "./ScoreTable";
import NotificationSystem from 'react-notification-system';
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

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change)
    }

    render() {
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
                                            newState={this.state.rankedData}
                                            successNotification={() => this.handleClick}
                                        />
                                        <br/>
                                        <br/>
                                        <br/>
                                        <Button bsStyle="info" pullRight fill name="submit"
                                                onClick={this.handleClick.bind(this,'bc')}>
                                            Send Email
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

export default withRouter(ScoreList);