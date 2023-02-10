import React from "react";
import { useNavigate } from "react-router-dom";
import { ChannelListMessengerProps, useChatContext } from "stream-chat-react";
import cx from "classnames";
import Button from "../Button";
import { logChatPromiseExecution } from "stream-chat";
import { useLoggedInAuth } from "../../context/AuthContext";

const Channels = ({ loadedChannels }: ChannelListMessengerProps) => {
  const { setActiveChannel, channel: activeChannel } = useChatContext();
  const { logout } = useLoggedInAuth();
  const navigate = useNavigate();

  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-100";
            return (
              <button
                onClick={() => setActiveChannel(channel)}
                disabled={isActive}
                className={cx(
                  "p-4 rounded-lg flex gap-3 items-center",
                  extraClasses
                )}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data.image}
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <div className="text-ellipsis oveflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No conversations"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => logout.mutate()} disabled={logout.isLoading}>
        Logout
      </Button>
    </div>
  );
};

export default Channels;
