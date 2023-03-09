import React, { useMemo, useState, useEffect, createContext } from "react";
import axios from "axios";

import moment from "moment";

import Table from "./Table";
import "./App.css";

import { Segment, Loader, Dimmer } from "semantic-ui-react";

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

export const DataContext = createContext(null);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Execution",
        columns: [
          {
            Header: "ID",
            accessor: "id"
          }
        ]
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "UUID",
            accessor: "attributes.uuid"
          },
          {
            Header: "Received Time",
            id: "receviedTime",
            accessor: (d) => {
              return moment(d.receivedTime)
                .local()
                .format("MM-DD-YYYY hh:mm:ss A");
            }
          },
          {
            Header: "Schedule Time",
            id: "scheduleTime",
            accessor: (d) => {
              return moment(d.scheduleTime)
                .local()
                .format("MM-DD-YYYY hh:mm:ss A");
            }
          },
          {
            Header: "DataSchema ID",
            accessor: "relationships.dataSchema.data.id"
          },
          {
            Header: "DataSource ID",
            accessor: "relationships.dataSource.data.id"
          },
          {
            Header: "Action",
            id: "startTime",
            Cell: (props) => {
              return props.row.original.attributes.startTime == null ? (
                <button>Click Me </button>
              ) : (
                <button disabled> No action </button>
              );
            }
          }
        ]
      }
    ],
    []
  );

  // const dataStore = useContext;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getExecutions() {
    const url = "/executions";
    setIsLoading(true);

    const response = await axios.get(url);
    console.log(response.data.data.data);
    setData(response.data.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    // getData();
    getExecutions();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="App">
        {isLoading ? (
          <Segment style={{ marginTop: "10em", minHeight: "20em" }}>
            <Dimmer active>
              <Loader>Fetching Executions</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Table columns={columns} />
        )}
      </div>
    </DataContext.Provider>
  );
}

export default App;

mock.onGet("/executions").reply(200, {
  data: {
    data: [
      {
        type: "execution",
        id: "903",
        attributes: {
          uuid: "05ea5a00116f43c082df37e161cf2635",
          receivedTime: "2020-03-12T15:22:35.193+0000",
          scheduleTime: "2020-03-26T15:22:23.380+0000"
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "6" } }
        },
        links: {
          self: "/api/rest/admin/executions/903"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: null,
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: "2020-03-11T19:46:00.034+0000",
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: "2020-03-11T19:46:00.034+0000",
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "102" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: null,
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "102" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: "2020-03-11T19:46:00.034+0000",
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "102" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: null,
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "102" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      },
      {
        type: "execution",
        id: "703",
        attributes: {
          uuid: "8920cb1446d24c26b230e20cbbfb7f33",
          receivedTime: "2020-03-11T19:35:36.082+0000",
          scheduleTime: "2020-03-11T19:45:20.151+0000",
          startTime: null,
          endTime: "2020-03-11T19:46:01.259+0000",
          canceled: false
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "102" } },
          dataSource: { data: { type: "DataSource", id: "7" } }
        },
        links: {
          self: "/api/rest/admin/executions/703"
        }
      }
    ],
    included: [
      {
        type: "DataSchemaField",
        id: "1106",
        attributes: { fieldName: "Callee #", dataType: "STRING", position: 3 }
      },
      {
        type: "DataSchemaField",
        id: "1105",
        attributes: { fieldName: "Caller #", dataType: "STRING", position: 2 }
      },
      {
        type: "DataSchemaField",
        id: "1104",
        attributes: { fieldName: "Date/Time", dataType: "STRING", position: 1 }
      },
      {
        type: "DataSchemaField",
        id: "1103",
        attributes: { fieldName: "Duration", dataType: "STRING", position: 0 }
      },
      {
        type: "DataSchema",
        id: "103",
        attributes: { name: "Phone Data" },
        relationships: {
          fields: {
            data: [
              { type: "DataSchemaField", id: "1106" },
              { type: "DataSchemaField", id: "1105" },
              { type: "DataSchemaField", id: "1104" },
              { type: "DataSchemaField", id: "1103" }
            ]
          }
        },
        links: {
          self: "/api/rest/admin/dataschemas/103"
        }
      },
      {
        type: "DataSource",
        id: "2",
        attributes: {
          name: "Standalone-Phone-Data-5K",
          executionMode: "Batch",
          description: "Standalone Engine running on a sample phone data file"
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } }
        },
        links: {
          self: "/api/rest/admin/datasources/2"
        }
      }
    ]
  }
});

mock.onGet("/api/get/executions?succeededOnly=true").reply(200, {
  data: {
    data: [
      {
        type: "execution",
        id: "903",
        attributes: {
          uuid: "05ea5a00116f43c082df37e161cf2635",
          receivedTime: "2020-03-12T15:22:35.193+0000",
          scheduleTime: "2020-03-26T15:22:23.380+0000"
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "2" } }
        },
        links: {
          self: "/responder/api/rest/admin/executions/903"
        }
      }
    ]
  }
});

mock.onGet("/api/get/executions?failedOnly=true").reply(200, {
  data: {
    data: [
      {
        type: "execution",
        id: "903",
        attributes: {
          uuid: "05ea5a00116f43c082df37e161cf2635",
          receivedTime: "2020-03-12T15:22:35.193+0000",
          scheduleTime: "2020-03-26T15:22:23.380+0000"
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "2" } }
        },
        links: {
          self: "/responder/api/rest/admin/executions/903"
        }
      }
    ]
  }
});

mock.onGet("/api/get/executions?pendingOnly=true").reply(200, {
  data: {
    data: [
      {
        type: "execution",
        id: "903",
        attributes: {
          uuid: "05ea5a00116f43c082df37e161cf2635",
          receivedTime: "2020-03-12T15:22:35.193+0000",
          scheduleTime: "2020-03-26T15:22:23.380+0000"
        },
        relationships: {
          dataSchema: { data: { type: "DataSchema", id: "103" } },
          dataSource: { data: { type: "DataSource", id: "2" } }
        },
        links: {
          self: "/responder/api/rest/admin/executions/903"
        }
      }
    ]
  }
});
