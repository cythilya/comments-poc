import { Composer, Thread } from "@liveblocks/react-comments";
import { RoomProvider, useThreads } from "./liveblocks.config";

function LiveBlocksThreads({ currentElementId }) {
    const { threads } = useThreads();
  
    return (
      <main>
        {threads.map((thread) => {
          const isCurrentElement = currentElementId === thread.roomId

          return isCurrentElement && (
            <Thread 
              autoFocus={true}
              key={thread.id} 
              thread={thread} 
              className="thread" 
              onResolvedChange={() => {
                console.log('resolved')
              }}
            />
          );
        })}
        {/* <Composer className="composer" /> */}
      </main>
    );
  }
  export default LiveBlocksThreads