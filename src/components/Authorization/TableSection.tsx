import React from "react";
import { AuthorizationItem } from "../../types/index";
import "../../styles/Authorization/TableSection.css";

type Props = {
    data: AuthorizationItem[];
};

const TableSection: React.FC<Props> = ({ data }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order Date | Time</th>
                        <th>Patient</th>
                        <th>Patient Type</th>
                        <th>Doctor Name</th>
                        <th>Bill Details</th>
                        <th>No. of Orders</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div>{item.date}</div>
                                <span className="sub">{item.time}</span>
                            </td>

                            <td>
                                <div>
                                    {item.patient.name} | {item.patient.age}
                                </div>
                                <span className="sub">
                                    {item.patient.code} | {item.patient.gender}
                                </span>
                            </td>

                            <td>{item.patientType}</td>

                            <td>{item.doctorName}</td>

                            <td>
                                <span className="bill">{item.billId}</span>
                            </td>

                            <td>{item.orders}</td>

                            <td>
                                <button className="icon-btn">📄</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="footer">
                <span>Showing 1 to {data.length} of 100 entries</span>

                <div className="pagination">
                    <button>{"<"}</button>
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>{">"}</button>
                </div>
            </div>
        </>
    );
};

export default TableSection;