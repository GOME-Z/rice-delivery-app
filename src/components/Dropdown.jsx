import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";

function Dropdown({ title, waypoints, multiSelect = false, robstatus }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  function handleonWaypoint(item) {
    axios
      .post("http://localhost:3001/set-goal", "waypoint: " + item.name)
      .then((response) => {
        console.log(response);
        console.log("Request sent: ", item.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {waypoints.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button
                type="button"
                onClick={() => handleOnClick(item)}
                onClick={() => handleonWaypoint(item)}
              >
                <span>{item.name}</span>
                <span>{isItemInSelection(item) && "    <--Selected"}</span>
              </button>
              <span>{isItemInSelection(item) ? "Request sent!" : ""}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
