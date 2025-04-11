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
                <p><strong>Date of Birth :</strong> {employee.dateOfBirth}</p>
                <p><strong>Department :</strong> {employee.department}</p>
                {/*ici les autres infos utiles */}
            </main>

        </>
    );
};

export default EmployeeDetail;