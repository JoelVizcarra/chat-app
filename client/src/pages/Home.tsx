import React from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingErrorIndicator,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import Channels from "../components/chat/Channels";
import { useLoggedInAuth } from "../context/AuthContext";

const Home = () => {
  const { user, streamChat } = useLoggedInAuth();

  if (streamChat == null) return <LoadingErrorIndicator />;
  return (
    <Chat client={streamChat}>
      <ChannelList
        List={Channels}
        sendChannelsToList
        filters={{ members: { $in: [user.id] } }}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default Home;
