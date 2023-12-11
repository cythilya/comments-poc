import { useState, useEffect } from "react";
import "./App.css";
import { Composer, Thread } from "@liveblocks/react-comments";
import { RoomProvider, useThreads } from "./liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import LiveBlocksThreads from './LiveBlocksThreads'
import _map from 'lodash/map'

const ELEMENT_LIST = { // store in metadata
  'th_5im7uCmWK9HDN5SovaeFQ': {
    elementID: 'th_5im7uCmWK9HDN5SovaeFQ',
    timestamp: '2023-12-12',
    position: {
      x: 200,
      y: 300,
    },
    startClassName: 'hello1',
    endClassName: 'hello-start1',
  },
  'th_5E1V_62ePOlcYMGWEjdbb': {
    elementID: 'th_5E1V_62ePOlcYMGWEjdbb',
    timestamp: '2023-12-12',
    position: {
      x: 300,
      y: 400,
    },
    startClassName: 'hello2',
    endClassName: 'hello-start2',
  }
}

function App() {
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentElementId, setCurrentElementId] = useState('th_5im7uCmWK9HDN5SovaeFQ');

  useEffect(() => {
    const loadData = async () => {

        try {
            setLoading(true);
            const response = await fetch(`https://api.liveblocks.io/v2/rooms/${currentElementId}/storage`, {
              method:'GET',
              headers: {
                Authorization: `Bearer sk_dev_abQ3M8bnDQSfEVUbDuhZgc0XWRZ_x8Hzc7vPcBWOSxTcNG3bzGh1gdkFBOfeQDzC`,
                "Content-Type": "application/json",                
              },
            });
            const json = await response.json();
            console.log('json', json);
            setData(json);
            setLoading(false);
        } catch (error) {
            console.log("error: " + error);
        }
    }

    loadData();

}, []);
  
  return (
    <>
      <div className="App">
        <div className="canvas" onAnimationEnd={() => setStart(false)}>
          {
            _map(ELEMENT_LIST, (element) => {
              return (
                <div 
                  id={element.elementID}
                  key={element.elementID}
                  onClick={() => {
                    setCurrentElementId(element.elementID)
                  }}
                >
                  {start && <div className={element.startClassName}></div>}
                  {!start && <div className={element.endClassName}></div>}                
                </div>
              )
            })
          }
        </div>
        <div className="comments">
          <>
            <RoomProvider id={currentElementId} initialPresence={{}}>
              <ClientSideSuspense fallback={<div>Loading…</div>}>
                {() => <LiveBlocksThreads currentElementId={currentElementId} />}
              </ClientSideSuspense>
              <Composer
                className="composer" 
                metadata={{
                  elementId: currentElementId,
                  position: JSON.stringify(ELEMENT_LIST[currentElementId].position),
                  timestamp: ELEMENT_LIST[currentElementId].timestamp // create time === selection kf timestamp
                }}>
                <Composer.Form>
                  <Composer.Editor
                    components={{
                      Mention: () => {
                        console.log('Mention')
                        return (<Composer.Mention />)
                      },
                      MentionSuggestions: () => (
                        <Composer.Suggestions>
                          <Composer.SuggestionsList>
                            <Composer.SuggestionsListItem />
                          </Composer.SuggestionsList>
                        </Composer.Suggestions>
                      ),
                      Link: () => <Composer.Link />,
                    }}
                  />
                  <Composer.Submit />
                </Composer.Form>
              </Composer>
            </RoomProvider>
          </>
          {/* <ul className="room-list">
            {_map(rooms, (room) => (
              <li key={room.id}>{room.metadata.name}</li>
            ))}
          </ul> */}
        </div>
      </div>
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        animate!
      </button>
    </>
  );
}

export default App;
