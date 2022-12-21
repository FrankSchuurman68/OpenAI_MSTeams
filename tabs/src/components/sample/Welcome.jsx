import React, { useState } from "react";
import { Image, Menu } from "@fluentui/react-northstar";
import "./Welcome.css";
import { Chat } from "./Chat";

export function Welcome() {

  const steps = ["question"];
  const friendlyStepsName = {
    question: "1. Stel een vraag",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("question");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="wr-logo.png" />
        <h1 className="center">Support Hub</h1>
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "question" && (
            <div>
              <Chat />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
