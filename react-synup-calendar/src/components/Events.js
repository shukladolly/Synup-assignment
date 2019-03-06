import React, { Component } from 'react';
import '../App.css'


class Events extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            events: [{ name: "" }]
        };
    }

    handleEventChane = idx => evt => {
        const newEvents = this.state.events.map((event, sidx) => {
            if (idx !== sidx) return event;
            return { ...event, name: evt.target.value };
        });

        this.setState({ events: newEvents });
    };

    handleAddEvent = () => {
        this.setState({
            events: this.state.events.concat([{ name: "" }])
        });
    };

    handleRemoveEvent = idx => () => {
        this.setState({
            events: this.state.events.filter((s, sidx) => idx !== sidx)
        });
    };




    render() {
       
        const month = this.props.activeDate.split("-")[2]
        return (
            <div>
            <span className="month">{month}</span>   
               
         
                {this.state.events.map((events, idx) => (
                    <div className="box">
                        <input className="input"
                            type="text"
                            placeholder={`Event ${idx + 1} name`}
                            value={events.name}
                            onChange={this.handleEventChane(idx)}
                        />
                        <button
                           type="button" className="button"
                            onClick={this.handleRemoveEvent(idx)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={this.handleAddEvent}
                    className="buttonCls"
                >
                    Add Event
                </button>
            </div>)

    }
}

export default Events;