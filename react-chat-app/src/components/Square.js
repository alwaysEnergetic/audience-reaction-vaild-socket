import React, { useState, useEffect } from "react";
import "./square.css";
import Audience from "./Audience.js";
const Square = (props) => {
  return (
    <div>
      {props.users.map((item, index) => {
        return index === 0 ? (
          <h1 className="square">
            <span className="name">{item.name}</span>
          </h1>
        ) : index === 2 ? (
          <div>
            <div className="general-3">
              <Audience
                name={item}
                index={props.index}
                id={props.id}
                room={props.room}
                flag={props.flag}
                handleFlag={props.handleFlag}
              />
            </div>
          </div>
        ) : index > 3 ? (
          <>
            <div className="general-4">
              <Audience
                name={item}
                index={props.index}
                id={props.id}
                room={props.room}
                flag={props.flag}
                handleFlag={props.handleFlag}
              />
            </div>
          </>
        ) : index === 1 ? (
          <>
            <div className="general-1">
              <Audience
                name={item}
                index={props.index}
                id={props.id}
                room={props.room}
                flag={props.flag}
                handleFlag={props.handleFlag}
              />
            </div>
          </>
        ) : (
          <>
            <div className="general-2">
              <Audience
                name={item}
                index={props.index}
                id={props.id}
                room={props.room}
                flag={props.flag}
                handleFlag={props.handleFlag}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Square;
