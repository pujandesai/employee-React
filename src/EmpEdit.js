import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();

  useEffect(() => {
    fetch("https://employee-node-alpha.vercel.app/api/employee/" + empid)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        idchange(resp[0].id);
        Employeeidchange(resp[0].employee_id);
        namechange(resp[0].name);
        emailchange(resp[0].email);
        salarychange(resp[0].salary);
        departmentchange(resp[0].department);
        positionchange(resp[0].position);
        activechange(!resp[0].isRemove);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const [id, idchange] = useState("");
  const [employeeid, Employeeidchange] = useState("");
  const [name, namechange] = useState("");
  const [department, departmentchange] = useState("");
  const [position, positionchange] = useState("");
  const [salary, salarychange] = useState("");
  const [email, emailchange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = {
      employeeid,
      name,
      department,
      position,
      salary,
      isRemove: !active, // Ensure the isRemove value is inverted before sending
    };

    fetch("https://employee-node-alpha.vercel.app/api/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        disabled
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Employee Id</label>
                      <input
                        value={employeeid}
                        disabled
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Department</label>
                      <input
                        required
                        value={department}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => departmentchange(e.target.value)}
                        className="form-control"
                      ></input>
                      {department.length === 0 && validation && (
                        <span className="text-danger">
                          Enter the Department
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Position</label>
                      <input
                        required
                        value={position}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => positionchange(e.target.value)}
                        className="form-control"
                      ></input>
                      {position.length === 0 && validation && (
                        <span className="text-danger">Enter the Position</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        required
                        type="number"
                        value={salary}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => salarychange(e.target.value)}
                        className="form-control"
                      ></input>
                      {salary.length === 0 && validation && (
                        <span className="text-danger">Enter the Salary</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
