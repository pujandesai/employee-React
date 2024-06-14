import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("https://employee-node-alpha.vercel.app/api/employee/delete/" + id, {
        method: "PUT",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    // fetch("https://employee-node-alpha.vercel.app/api/employee")
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.2238336,72.8334336&radius=5000&key=AIzaSyD411EtreduCQZ14azJpb8MtMQwBxWzNho")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {

        const formattedData = resp.map((item) => ({
          ...item,
          hire_date: new Date(item.hire_date).toLocaleString(),
        }));
        empdatachange(formattedData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Employee Id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Department</td>
                <td>Hire Date</td>
                <td>Position</td>
                <td>Salary</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.employee_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>{item.hire_date}</td>
                    <td>{item.position}</td>
                    <td>
                      {"$"}
                      {item.salary}
                    </td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item._id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item._id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item._id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
