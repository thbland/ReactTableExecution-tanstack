import React, { useState, createContext, useContext } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

import {
  Input,
  Button,
  Segment,
  Dropdown,
  Loader,
  Dimmer,
  Message,
  Icon,
  Label
} from "semantic-ui-react";
import { DataContext } from "./App";
import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const filterOptions = [
  {
    key: "succeededOnly",
    text: "Succeeded Only",
    value: "succeededOnly",
    label: { color: "green", empty: true, circular: true }
  },
  {
    key: "failedOnly",
    text: "Failed Only",
    value: "failedOnly",
    label: { color: "red", empty: true, circular: true }
  },
  {
    key: "pendingOnly",
    text: "Pending Only",
    value: "pendingOnly",
    label: { color: "yellow", empty: true, circular: true }
  }
];

const searchOption = [
  {
    key: "dataSchemaId",
    text: "Data Schema Id",
    value: "dataSchemaId"
  },
  {
    key: "dataSourceId",
    text: "Data Source Id",
    value: "dataSourceId"
  }
];

const baseURL = "/executions";

export default function Table({ columns }) {
  const [filterInput, setFilterInput] = useState("");
  const [filterChoice, setFilterChoice] = useState("");
  const [selectionChoice, setSelectionChoice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, setData } = useContext(DataContext);

  // Use the state and functions returned from useTable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy
  );

  async function getExecutions() {
    setIsLoading(true);
    await sleep(1000);
    const response = await axios.get(baseURL);
    console.log(response);
    setData(response.data.data.data);
    setIsLoading(false);
  }

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    const filterSelection =
      selectionChoice === "dataSchemaId"
        ? "relationships.dataSchema.data.id"
        : selectionChoice === "dataSourceId"
        ? "relationships.dataSource.data.id"
        : null;
    setFilter(filterSelection, value);
    setFilterInput(value);
  };

  async function getFilterData(e, data) {
    console.log("getFilterData called");
    console.log(data.value);
    setFilterChoice(data.value);
    //call filter endpoint
    setIsLoading(true);
    const url = `/api/get/executions?${data.value}=true`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data.data.data);
    // UPDATE CONTEXT with NEW DATA
    setData(response.data.data.data);
    setIsLoading(false);
  }

  const removeLabel = (e, data) => {
    //handle removal of the filtered label
    console.log("remove label called");
    setFilterChoice("");
    getExecutions();
  };

  const handleSelection = (e, data) => {
    console.log(data.value);
    // setSelectionChoice(data.value);
    if (data.value === "") {
      console.log("Dropdown selection cleared, this will clear filter input");
      setFilterInput("");
      setSelectionChoice("");
      getExecutions();
    } else {
      setSelectionChoice(data.value);
    }
    return;
  };

  const getLabelColor = (filterChoice) => {
    if (filterChoice === "succeededOnly") {
      return "green";
    } else if (filterChoice === "pendingOnly") {
      return "yellow";
    } else if (filterChoice === "failedOnly") {
      return "red";
    } else {
      return null;
    }
  };

  // Render the UI for the table
  return (
    <>
      <Message
        header="Filterable / Sortable"
        content="The executions below are searchable/ etc by the paramters presented"
      />
      <Dropdown
        placeholder="Filter By Data Schema/Source ID's"
        fluid
        clearable
        selection
        value={selectionChoice}
        onChange={handleSelection}
        options={searchOption}
      />
      {selectionChoice && selectionChoice === "dataSchemaId" ? (
        <Input
          fluid
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search by Data Schema ID"
          style={{ marginTop: "2em" }}
        />
      ) : selectionChoice === "dataSourceId" ? (
        <Input
          fluid
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search by Data Source ID"
          style={{ marginTop: "2em" }}
        />
      ) : null}
      <div style={{ display: "flex", marginTop: "2em" }}>
        <div>
          <Dropdown clearable text="Filter records" icon="filter">
            <Dropdown.Menu>
              <Dropdown.Divider />
              <Dropdown.Header icon="tags" content="Filter Options" />
              <Dropdown.Menu scrolling>
                {filterOptions.map((option) => (
                  <Dropdown.Item
                    onClick={getFilterData}
                    key={option.value}
                    {...option}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          {filterChoice && filterChoice !== "" ? (
            <Label as="a" color={getLabelColor(filterChoice)} tag>
              Current Filter: {filterChoice}
              <Icon name="delete" onClick={removeLabel} />
            </Label>
          ) : (
            <div>
              {" "}
              <b> No current Filter selected </b>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <Segment style={{ minHeight: "10em" }}>
          <Dimmer active>
            <Loader>Fetching Executions</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <table {...getTableProps()} style={{ marginTop: "2em" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
