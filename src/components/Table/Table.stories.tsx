import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import { ColumnsType } from "./types";
import React from "react";

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

type User = {
  id: number;
  name: string;
  city?: string;
  phone: string;
  count: number;
  date: string;
};

const data: User[] = [
  {
    id: 1,
    name: "Emily Johnson",
    city: "Los Angeles",
    phone: "+1 987-654-3210",
    count: 51,
    date: "2023-11-23",
  },
  {
    id: 2,
    name: "James Williams",
    city: "Sydney",
    phone: "+61 9876-543210",
    count: 10,
    date: "2023-05-14",
  },
  {
    id: 3,
    name: "Olivia Brown",
    city: "",
    phone: "+7 (950) 372-56-84",
    count: 54,
    date: "2023-03-29",
  },
  {
    id: 4,
    name: "Ethan Miller",
    phone: "+1 555-123-4567",
    count: 75,
    date: "2023-02-01",
  },
  {
    id: 5,
    name: "John Smith",
    city: "New York",
    phone: "+1 123-456-7890",
    count: 82,
    date: "2023-03-15",
  },
];

const columns: ColumnsType<User> = [
  {
    key: "name",
    title: "Name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record, index) => {
      if (index % 2 === 0) {
        return record.name;
      } else {
        const [name, surname] = record.name.split(" ");
        return (
          <div>
            {name}
            <br />
            {surname}
          </div>
        );
      }
    },
  },
  {
    key: "city",
    title: "City",
    render: (value) => (value ? value : "—"),
  },
  {
    key: "phone",
    title: "Phone",
  },
  {
    key: "count",
    title: "Count",
    align: "right",
    sorter: (a, b) => a.count - b.count,
  },
  {
    key: "date",
    title: "Date created",
    align: "right",
  },
];

export const Default: Story = {
  render: () => {
    return <Table data={data} columns={columns} rowKey="id" />;
  },
};

export const Empty: Story = {
  render: () => {
    return <Table data={[]} columns={columns} rowKey="id" />;
  },
};

export const Selection: Story = {
  render: () => {
    return (
      <Table
        data={data}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: [],
          onChange: (keys) => {
            console.log("Выбранные ключи:", keys);
          },
        }}
      />
    );
  },
};
