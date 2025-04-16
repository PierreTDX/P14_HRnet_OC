import React from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDetail = () => {
    const location = useLocation();
    const employee = location.state?.employee;

    if (!employee) {
        return <main>No data found.</main>;
    }

    return (

        <>
            <h1 className='pageTitle'>Detail Employee</h1>
            <main>
                <p><strong>Fisrt Name :</strong> {employee.firstName}</p>
                <p><strong>Last Name :</strong> {employee.lastName}</p>
                <p><strong>Birth Date :</strong> {employee.dateOfBirth}</p>
                <br />
                <p><strong>Street :</strong> {employee.street}</p>
                <p><strong>City :</strong> {employee.city}</p>
                <p><strong>State :</strong> {employee.state}</p>
                <p><strong>Zip Code :</strong> {employee.zipCode}</p>
                <br />
                <p><strong>Start Date :</strong> {employee.startDate}</p>
                <p><strong>Department :</strong> {employee.department}</p>
            </main>
        </>
    );
};

export default EmployeeDetail;