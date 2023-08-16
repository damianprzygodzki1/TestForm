import React from 'react';
import './Table.module.css';

const Table = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>E-mail</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;