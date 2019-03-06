import React from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar";
import * as Styled from "./styles";
import { isDate, getDateISO } from "../../helpers/calendar";
import Events from "../Events"


class Datepicker extends React.Component {
  state = { date: getDateISO(new Date()), calendarOpen: true };


  handleChange = evt => evt.preventDefault();

  handleDateChange = date => {
    const { onDateChanged } = this.props;
    const { date: currentDate } = this.state;
    const newDate = date ? getDateISO(date) : null;

    currentDate !== newDate &&
      this.setState({ date: newDate}, () => {
        typeof onDateChanged === "function" && onDateChanged(this.state.date);
      });
  };

  componentDidMount() {
    const { value: date } = this.props;
    const newDate = date && new Date(date);

    isDate(newDate) && this.setState({ date: getDateISO(newDate) });
  }

  componentDidUpdate(prevProps) {
    const { value: date } = this.props;
    const { value: prevDate } = prevProps;
    const dateISO = getDateISO(new Date(date));
    const prevDateISO = getDateISO(new Date(prevDate));

    dateISO !== prevDateISO && this.setState({ date: dateISO });
  }

  render() {
    const { label } = this.props;
    const { date, calendarOpen } = this.state;

    return (
      <div>
         
      <Styled.DatePickerContainer>
        <Styled.DatePickerFormGroup>
          <Styled.DatePickerLabel>{label}</Styled.DatePickerLabel>
          <Styled.DatePickerInput
            type="text"
            value={date ? date.split("-").join(" / ") : ""}
            onChange={this.handleChange}
            readOnly="readonly"
            placeholder="YYYY / MM / DD"
          />
        </Styled.DatePickerFormGroup>

        <Styled.DatePickerDropdown
          isOpen={this.state.calendarOpen}
        >
          <Styled.DatePickerDropdownToggle color="transparent" />

          <Styled.DatePickerDropdownMenu>
            { (
              <div>
                
              <Calendar
                date={date && new Date(date)}
                onDateChanged={this.handleDateChange}
              />
              <Events activeDate={this.state.date}/>
              </div>
            )}
          
          </Styled.DatePickerDropdownMenu>
         
        </Styled.DatePickerDropdown>
        
      </Styled.DatePickerContainer>
      
    
         </div>  );
  }
}

Datepicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onDateChanged: PropTypes.func
};

export default Datepicker;
