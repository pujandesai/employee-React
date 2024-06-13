import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://https://employee-node-alpha.vercel.app/api/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Employee Create</h2>
          </div>
          <div className="card-body"></div>

          {empdata && (
            <div>
              <h2>
                The Employee name and Employee Id is : <b>{empdata.name}</b> (
                {empdata.employee_id})
              </h2>
              <h3>Contact Details</h3>
              <h5>Email is : {empdata.email}</h5>
              <h5>Position is : {empdata.position}</h5>
              <h5>Department is : {empdata.department}</h5>
              <h5>
                Hire Date is : {new Date(empdata.hire_date).toLocaleString()}
              </h5>
              <h5>Email is : {empdata.email}</h5>
              <h5>
                Salary is : {"$"}
                {empdata.salary}
              </h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
            </div> */}
    </div>
  );
};

export default EmpDetail;
