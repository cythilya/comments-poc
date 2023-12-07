import { Composer, Thread } from "@liveblocks/react-comments";
import { RoomProvider, useThreads } from "./liveblocks.config";

function LiveBlocksThreads({ currentElementId }) {
    const { threads } = useThreads();
  
    return (
      <main>
        {threads.map((thread) => {
          const isCurrentElement = currentElementId === thread.roomId
          const newThreadData = {
            ...thread,
            metadata: {
              elementId: currentElementId,
              position: JSON.stringify({x: 100, y: 200}),
            }
          }

          return isCurrentElement && (
            <Thread 
              autoFocus={true}
              key={thread.id} 
              thread={newThreadData} 
              className="thread" 
              // onResolvedChange={() => {
              //   console.log('resolved')
              // }}
            />
          );
        })}
        {/* <Composer className="composer" /> */}
      </main>
    );
  }
  export default LiveBlocksThreads