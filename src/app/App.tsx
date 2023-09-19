import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
  error: boolean;
  errorMsg: string;
  data: any; // Replace 'any' with the actual type of your JSON data
}


function App() {
  const [responseData, setResponseData] = useState<ApiResponse>({ error: false, errorMsg: '', data: null });

  //fetch data from api using axios
  useEffect(() => {
    // Define the API URL
    const apiUrl = 'http://127.0.0.1:3000/load/dataJson';

    // Make the GET request to the API using Axios
    axios.get(apiUrl)
      .then((response) => {
        const data = response.data;
        setResponseData({ error: false, errorMsg: '', data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResponseData({ error: true, errorMsg: 'Error fetching data', data: null });
      });
  }, []);

  //convert time to HHMM format
  function minutesToHHMM(minutes: any) {
    if (isNaN(minutes) || minutes < 0) {
      return "Invalid input";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursStr = hours < 10 ? "0" + hours : hours.toString();
    const minutesStr = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes.toString();

    return hoursStr + ":" + minutesStr;
  }

  //create a singular card element
  function Card({ index }: { index: number }) {
    const data = responseData.data.data.data[index];
    const idKey = data.hasOwnProperty('adverts_id') ? 'adverts_id' : 'advert_playlist_id';
    const nameKey = data.hasOwnProperty('adverts_name') ? 'adverts_name' : 'playlist_name';
    const useridKey = data.hasOwnProperty('adverts_user_id') ? 'adverts_user_id' : 'client_id';
    const userIdLabel = useridKey === 'client_id' ? 'Client ID' : 'User ID';
    var time = data.adverts_refresh_time;
    time = minutesToHHMM(time);

    //define the label type
    let labelText = '';
    if (idKey === 'adverts_id') {
      labelText = 'Advert';
    } else if (idKey === 'advert_playlist_id') {
      labelText = 'Playlist';
    }

    return (
      <div className="card">
        {responseData.data ? (
          <>
            <div className="title">
              {JSON.stringify(data[idKey], null, 2)}: {JSON.parse(JSON.stringify(data[nameKey], null, 2))}
            </div>
            <div className="label">
              {labelText}
            </div>
            <div className="content_card">
              <span className="bold_text">{userIdLabel}:</span><span className="text"> {JSON.stringify(data[useridKey], null, 2)}</span>
            </div>
            {userIdLabel !== "Client ID" && (
              <div className="content_card">
                <span className="bold_text">Refresh Time: </span><span className="text">{JSON.parse(JSON.stringify(time, null, 2))} mins </span>
              </div>
            )}
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  }
  function formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return "N/A"; // Handle cases where the date string is not available
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  const cardIndices = responseData.data ? Array.from(Array(responseData.data.data.data.length).keys()) : [];

  const cardComponents = [];
  for (let i = 0; i < cardIndices.length; i++) {
    cardComponents.push(<Card key={i} index={cardIndices[i]} />);
  }

  return (
    <div className="App">
      <h1>Screen Summary</h1>
      {responseData.data ? (
        <div>
          <div className="card" id="team_card">
            <div className="title">2023: PX Team</div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  User ID:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.user_screens_user_id, null, 2)}
                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Active:
                </span>
                <span className="text">
                  {/* {JSON.stringify(responseData.data.data.screen.screen_active, null, 2)} */
                    responseData.data ? (
                      responseData.data.data.screen.screen_active === 1 ? " Yes" : " No"
                    ) : (
                      "Loading..." // You can display a loading message here while data is being fetched
                    )
                  }
                </span>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  Screen ID:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.screen_id, null, 2)} 
                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Height:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.screen_height, null, 2) + "px"}
                </span>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  Player ID:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.user_screens_mediaplayer_id, null, 2)}
                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Width:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.screen_width, null, 2) + "px"}
                </span>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  Profiles ID:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.profile.id, null, 2)} 
                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Ad Only:
                </span>
                <span className="text">
                  {/* {JSON.stringify(responseData.data.data.screen.user_screens_advert_only, null, 2)} */
                    responseData.data ? (
                      responseData.data.data.screen.screen_active === 1 ? " No" : " Yes"
                    ) : (
                      "Loading..." // You can display a loading message here while data is being fetched
                    )
                  }
                </span>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  Last Sync:
                </span>
                <span className="text">
                  {/* {JSON.stringify(responseData.data.data.screen.user_screens_last_sync, null, 2)} */
                    responseData.data ? (
                      formatDate(responseData.data.data.screen.user_screens_last_sync)
                    ) : (
                      "Loading..." // You can display a loading message here while data is being fetched
                    )
                  }

                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Random Ads:
                </span>
                <span className="text">
                  {
                    // JSON.stringify(responseData.data.data.screen.user_screens_random_adverts, null, 2)
                    responseData.data ? (
                      responseData.data.data.screen.screen_active === 1 ? " No" : " Yes"
                    ) : (
                      "Loading..." // You can display a loading message here while data is being fetched
                    )
                  }
                </span>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content_card">
                <span className="bold_text">
                  Run Time:
                </span>
                <span className="text">
                  {JSON.stringify(responseData.data.data.screen.screen_id, null, 2)}
                </span>
              </div>
              <div className="content_card">
                <span className="bold_text">
                  Publish Block:
                </span>
                <span className="text">
                  {/* {JSON.stringify(responseData.data.data.screen.user_screens_publish_block, null, 2)} */
                    responseData.data ? (
                      responseData.data.data.screen.screen_active === 1 ? " No" : " Yes"
                    ) : (
                      "Loading..." // You can display a loading message here while data is being fetched
                    )
                  }
                </span>
              </div>
            </div>
          </div>
          <div>
            <h1>Media and playlist data</h1>
            <div className="grid_container">
              {cardComponents}
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
