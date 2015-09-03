// Notification Bar
// ================
// Part of the main webapp's window chrome. Positioned at the top of the page,
// this bar details the alerts, events, and tasks that represent the current
// state of the system

"use strict";

import React from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";

import MiddlewareClient from "../../websocket/MiddlewareClient";
import SS from "../../flux/stores/SessionStore";
import MS from "../../flux/stores/MiddlewareStore";

var NotificationBar = React.createClass(
  { getInitialState: function () {
    return (
      { host        : MS.getHost()
      , protocol    : MS.getProtocol()
      , mode        : MS.getMode()
      , connected   : MS.getSockState()[0]
      , currentUser : SS.getCurrentUser()
      }
    );
  }

  // TODO: These should use EventBus
  , componentDidMount: function () {
    SS.addChangeListener( this.updateCurrentUser );
    MS.addChangeListener( this.updateHost );
    window.addEventListener( "click", this.makeAllInvisible );
  }

  , componentWillUnmount: function () {
    SS.removeChangeListener( this.updateCurrentUser );
    MS.removeChangeListener( this.updateHost );
    window.removeEventListener( "click", this.makeAllInvisible );
  }

  , updateCurrentUser: function ( event ) {
      this.setState({ currentUser: SS.getCurrentUser() });
    }

  , updateHost: function ( event ) {
      this.setState(
        { host      : MS.getHost()
        , protocol  : MS.getProtocol()
        , mode      : MS.getMode()
        , connected : MS.getSockState()[0]
        }
      );
    }

  , render: function () {
    let hostDisplay;

    if ( this.state.host ) {
      if ( this.state.mode === "SIMULATION_MODE" ) {
        hostDisplay = "Simulation Mode";
      } else {
        hostDisplay = this.state.host;
      }
    } else {
      hostDisplay = "Disconnected";
    }

    return (
      <header className = "app-header notification-bar" >

        <h1 className={ "hostname "
                      + ( this.state.connected
                        ? "connected"
                        : "disconnected"
                        )
                      + ( this.state.mode === "SIMULATION_MODE"
                        ? " simulation"
                        : ""
                        )
                      }
        >
          { hostDisplay }
        </h1>

        <div className="user-info">

          <DropdownButton
            pullRight
            title     = { this.state.currentUser }
            bsStyle   = "link"
            className = "user online"
          >
            <MenuItem
              key     = { 0 }
              onClick = { MiddlewareClient.logout.bind( MiddlewareClient ) }
            >
              {"Logout"}
            </MenuItem>
          </DropdownButton>

        </div>
      </header>
    );
  }
});

export default NotificationBar;
