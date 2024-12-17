import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Spin, message } from "antd";
import axios from "axios";

// The table component that will fetch and display application data
const GetDataTable = () => {
  const [data, setData] = useState([]); // Store data from the API
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [searchText, setSearchText] = useState(""); // Search input text
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  }); // Pagination configuration

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}`, {
          mode: "cors",
        }); // Replace with actual API URL
        setData(response.data); // Set the fetched data to state
      } catch (error) {
        message.error("Failed to fetch data from API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPagination({ current: 1, pageSize: pagination.pageSize }); // Reset pagination on search
  };

  // Filter data based on the search text
  const filteredData = data.filter(
    (item) =>
      item.applicantName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status_En.toLowerCase().includes(searchText.toLowerCase()) ||
      item.studentID.toLowerCase().includes(searchText.toLowerCase())
  );

  // Columns for Ant Design Table
  const columns = [
    {
      title: "Application No",
      dataIndex: "applicationNO",
      sorter: (a, b) => a.applicationNO - b.applicationNO,
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      sorter: (a, b) =>
        new Date(a.applicationDate) - new Date(b.applicationDate),
    },
    {
      title: "Student ID",
      dataIndex: "studentID",
      sorter: (a, b) => a.studentID.localeCompare(b.studentID),
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      sorter: (a, b) => a.paidAmount - b.paidAmount,
    },
    {
      title: "Status (English)",
      dataIndex: "status_En",
    },
    {
      title: "Status (Arabic)",
      dataIndex: "status_Ar",
    },
    {
      title: "Last Updated",
      dataIndex: "lastDate",
      sorter: (a, b) => new Date(a.lastDate) - new Date(b.lastDate),
    },
  ];

  // Handle pagination change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Applicant Name, Status, or Student ID"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Space>

      {/* Loading spinner while fetching data */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredData.length,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          onChange={handleTableChange}
          rowKey="applicationNO" // Unique key for each row
        />
      )}
    </div>
  );
};

export default GetDataTable;
