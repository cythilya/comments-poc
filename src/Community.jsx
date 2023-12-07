import React, { ReactElement, useState } from "react";

import "./community.css";
import "./theme.css";

import {
  SendBirdProvider as Sendbird,
  OpenChannel,
  OpenChannelSettings
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import CommunityChannelList from "./components/CommunityChannelList";

export default function Streaming({ appId, userId, theme, nickname }) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  return (
    <Sendbird appId={appId} userId={userId} theme={theme} nickname={nickname}>
      <div className="community-app">
        <div className="channel-list">
          <CommunityChannelList
            currentChannelUrl={currentChannelUrl}
            setCurrentChannel={setCurrentChannel}
          />
        </div>
        <div className="community-open-channel">
          <OpenChannel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
        {showSettings && (
          <OpenChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </Sendbird>
  );
}
