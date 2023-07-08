import React from "react";
import onOkIcon from "../images/ok.svg";
import onErrorIcon from "../images/error.svg";

function InfoTooltip({ tooltipIcon, title, isOpen, onClose, onOverlayClose }) {

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`} onClick={onOverlayClose}>
      <div className="popup__container-tooltip">
        <div className="popup__icon-tooltip">
          {tooltipIcon === "success" && (
            <img src={onOkIcon} alt="Статус Ок" />
          )}
          {tooltipIcon === "error" && <img src={onErrorIcon} alt="Статус Error" />}
        </div>
        <h2 className="popup__title-tooltip">{title}</h2>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  )
}

export default InfoTooltip;
