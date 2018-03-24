import React from 'react';
import _ from 'underscore';

class OpeningHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPeriods: false
    };
  }

  clickHandler(event) {
    this.setState({ showPeriods: !this.state.showPeriods });
  }

  getOpenNow() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var timeNow = Number(hours + minutes / 60);

    var openNow = _.some(this.props.info.data, (period, index) => {
      var timeOpen = Number(period[0].substring(0, period[0].length - 2));
      var timeClose = Number(period[1].substring(0, period[1].length - 2)) + 12;
      if (index !== weekdayNow) {
        return false;
      } else {
        return timeNow >= timeOpen && timeNow <= timeClose;
      }
    });

    if (openNow) {
      return 'Open';
    } else {
      return 'Closed';
    }
  }

  getTimeRange() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }
    var range = this.props.info.data[weekdayNow];
    var time1 = range[0];
    time1 = time1.substring(0, time1.length - 2);
    time1 += ':00AM';
    var time2 = range[1];
    time2 = time2.substring(0, time2.length - 2);
    time2 += ':00PM';

    return { time1: time1, time2: time2 };
  }

  render() {
    try {
      var testPropData = this.props.info.data[0];
    } catch(error) {
      return <div></div>;
    }
    var openNow = this.getOpenNow();
    var timeRange = this.getTimeRange();

    return (
      <div className="sidebar-flexbox-col sidebar-info-list-element">
        <div onClick={this.clickHandler.bind(this)} className="sidebar-flexbox-row sidebar-opening-hours-title">
          <div className="sidebar-info-list-element-icon">
            <i className={this.props.info.icon} />
          </div>
          <div className="sidebar-flexbox-row sidebar-info-list-text sidebar-opening-hours-title">
            <div>
              <div className="sidebar-periods-element-day sidebar-open-now-text">{openNow}</div>
            </div>
            <div>
              <div className="sidebar-periods-element-time">{timeRange.time1}</div>
              <div className="sidebar-periods-element-time">{timeRange.time2}</div>
            </div>
          </div>
          <div className="sidebar-expand-arrow" style={ this.state.showPeriods ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}>
            <i className="fas fa-angle-down fa-lg"/>
          </div>
        </div>
        <div className="sidebar-flexbox-col sidebar-periods" style={ this.state.showPeriods ? {display: 'flex'} : {'display': 'none'}}>
          <Periods opening_hours={this.props.info.data}/>
        </div>
      </div>
    );
  }
}

  var Periods = (props) => {
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let periodDivs = [];
    for (var i = 0; i < 7; i++) {
      let weekday = weekdays[i];
      let time1 = props.opening_hours[i][0];
      time1 = time1.substring(0, time1.length - 2);
      time1 += ':00AM';
      let time2 = props.opening_hours[i][1];
      time2 = time2.substring(0, time2.length - 2);
      time2 += ':00PM';

      var periodObj = {
        weekday: weekday,
        time1: time1,
        time2: time2
      }

      var weekdayNum = new Date(Date.now()).getDay() - 1;
      if (weekdayNum === -1) {
        weekdayNum = 6;
      }

      periodDivs.push(
        <div key={i} className="sidebar-flexbox-col sidebar-periods-element"
            style={{'fontWeight': weekdayNum === i ? 'bold' : 'normal'}} >
            <div className="sidebar-flexbox-row sidebar-periods-element-info">
              <div className="sidebar-periods-element-day" >{periodObj.weekday}</div>
              <div className="sidebar-periods-element-time">{periodObj.time1}</div>
            </div>
            <div className="sidebar-periods-element-info-additional">
              <div className="sidebar-periods-element-time">{periodObj.time2}</div>
            </div>
        </div>
      );

    }

  return (
      <div className="sidebar-flexbox-col sidebar-periods">
        {periodDivs}
      </div>
  );
};

export { OpeningHours, Periods};
