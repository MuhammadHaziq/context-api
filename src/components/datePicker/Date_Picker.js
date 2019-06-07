import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import LuxonUtils from "@date-io/luxon";

class Date_Picker extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   selectedDate: new Date()
  //   // };
  // }
  // handleDateChange = selectedDate => {
  //   // const { name, value } = e.target;
  //   this.setState({
  //     selectedDate: selectedDate
  //   });
  // };
  render() {
    // console.log(this.props.utils);
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            label={this.props.label}
            value={this.props.selectedDate}
            disableFuture
            format="DD/MM/YYYY"
            openTo="year"
            views={["year", "month", "day"]}
            onChange={this.props.handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}
export default Date_Picker;
