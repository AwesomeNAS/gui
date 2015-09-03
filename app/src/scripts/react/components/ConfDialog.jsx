// Generic Confirmation Dialog Box
// ===============================
// General purpose confirmation dialog, it can be used by any view/button that
// should require a confirmation
// (Yes/No/Close etc.) before the actual thing happening
// TODO: Give it a .less file for giving it custom themes

"use strict";

import React from "react";

// Twitter Bootstrap React Components
import { OverlayMixin, Modal, Button } from "react-bootstrap";

var ConfDialog = React.createClass(

  { propTypes: { bsStyle          : React.PropTypes.oneOf( [ "primary"
                                                           , "info"
                                                           , "danger"
                                                           , "warning"
                                                           , "success" ] )
               , modalTitle       : React.PropTypes.string
               , bodyText         : React.PropTypes.string
               , footerLeftBtn    : React.PropTypes.string
               , footerRightBtn   : React.PropTypes.string
               , modalAnimation   : React.PropTypes.bool
               , className        : React.PropTypes.string
               , callFunc         : React.PropTypes.func.isRequired
               , dataText         : React.PropTypes.node.isRequired
      }

  , mixins: [ OverlayMixin ]

  , getDefaultProps: function ( ) {
      return { bsStyle        : "primary"
             , title          : "Confirmation"
             , animation      : false
             , className      : ""
             , bodyText       : "Are you sure you want to perform this Action?"
             , footerLeftBtn  : "Cancel"
             , footerRightBtn : "Yes"
      };
    }

  , getInitialState: function ( ) {
      return {
        isModalOpen: false
      };
    }

  , handleToggle: function () {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

  // TODO: Make the this.props.dataText's onClick function
  // more elegant.
  , render: function () {
      return (
        <span onClick={this.handleToggle}>
          {this.props.dataText}
        </span>
      );
    }

  , saveClick: function () {
        this.props.callFunc();
        this.handleToggle();
      }

  , renderOverlay: function () {
      if ( !this.state.isModalOpen ) {
        return <span/>;
      }

      return (
        <Modal {...this.props} onRequestHide={this.handleToggle}>
          <div className="modal-body">
            <h4>{ this.props.bodyText }</h4>
          </div>
          <div className="modal-footer">
            <Button onClick={ this.handleToggle }>
              { this.props.footerLeftBtn }
            </Button>
            <Button bsStyle="primary" onClick={ this.saveClick }>
              { this.props.footerRightBtn }
            </Button>
          </div>
        </Modal>
        );
    }
  }
);

module.exports = ConfDialog;
