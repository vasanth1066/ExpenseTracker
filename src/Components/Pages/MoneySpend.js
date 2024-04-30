import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ExpenseAction } from "../../Store/ExpenseStore";

const MoneySpend = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  let totalexpenses = 0;
  data.map((val) => (totalexpenses = totalexpenses + Number(val.money)));
  console.log("totalexpenses", totalexpenses);

  useEffect(() => {
    fetch(
      "https://expense-tracker-e9fa0-default-rtdb.firebaseio.com/expenseamount.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((fetchedData) => {
        const dataArray = [];
        for (const key in fetchedData) {
          dataArray.push({
            id: key,
            ...fetchedData[key],
          });
        }
        setData(dataArray);
        dispatch(ExpenseAction.AddExpense(dataArray));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const moneyspenthandler = (event) => {
    event.preventDefault();

    const myobj = {
      money,
      description,
      category,
    };

    setData([...data, myobj]);

    fetch(
      "https://expense-tracker-e9fa0-default-rtdb.firebaseio.com/expenseamount.json",
      {
        method: "POST",
        body: JSON.stringify(myobj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Data couldn't be stored in Firebase";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((cruddata) => {
        console.log("Data stored in Firebase:", cruddata);
      })
      .catch((err) => {
        console.error("Error storing data in Firebase:", err);
        alert(err.message);
      });

    setMoney("");
    setCategory("");
    setDescription("");
  };

  const deleteHandler = (id) => {
    fetch(
      `https://expense-tracker-e9fa0-default-rtdb.firebaseio.com/expenseamount/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Data deleted from Firebase");

          setData(data.filter((item) => item.id !== id));
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting data from Firebase:", err);
        alert(err.message);
      });
  };

  const editHandler = (val) => {
    setCategory(val.category);
    setDescription(val.description);
    setMoney(val.money);

    fetch(
      `https://expense-tracker-e9fa0-default-rtdb.firebaseio.com/expenseamount/${val.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ money, description, category }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Data deleted from Firebase");
          deleteHandler(val.id);
        } else {
          return res.json().then((data) => {
            let errormessage = "Data couldn't be deleted from Firebase";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting data from Firebase:", err);
        alert(err.message);
      });
  };
  const exportCSV = () => {
    const csvContent = data
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`container-fluid ${
        isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
      } p-3 vh-100 d-flex flex-column`}
    >
      {totalexpenses >= 10000 && (
        <div
          className="alert alert-success container-xl d-flex justify-content-center align-items-center"
          role="alert"
        >
          <button type="button" className="btn btn-Success">
            <h4> Activate Premium!!!</h4>
          </button>
        </div>
      )}
      <div className="container-xl d-flex justify-content-center align-items-center">
        <form
          onSubmit={moneyspenthandler}
          className={`w-100 ${isDarkMode ? "text-light" : "text-dark"}`}
        >
          <div className="mb-7">
            <label
              htmlFor="MoneySpent"
              className={`form-label ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
            >
              Money Spent
            </label>
            <input
              type="number"
              className={`form-control ${
                isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
              }`}
              id="MoneySpent"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div className="mb-7">
            <label
              htmlFor="Description"
              className={`form-label ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
            >
              Description
            </label>
            <input
              type="text"
              className={`form-control ${
                isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
              }`}
              id="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-7">
            <label
              htmlFor="Category"
              className={`form-label ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
            >
              Category
            </label>
            <select
              className={`form-select ${
                isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
              }`}
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select any option below</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Movie">Movie</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
          <br />

          <div className="mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div style={{ marginBottom: "10px" }}></div>
        </form>
      </div>

      <div
        className={`container-xxl d-flex justify-content-center align-items-center ${
          isDarkMode ? "text-light" : "text-black"
        }`}
      >
        <div>
          {data.map((val, index) => (
            <ul
              key={index}
              className={`list-group ${isDarkMode ? "bg-dark text-light" : ""}`}
            >
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  isDarkMode ? "bg-dark text-light" : ""
                }`}
              >
                <span
                  className={`list-group-item-action ${
                    isDarkMode ? "text-light" : ""
                  }`}
                >
                  {val.description}
                </span>
                <div style={{ marginRight: "10px" }}></div>
                <span
                  className={`list-group-item-action ${
                    isDarkMode ? "text-light" : ""
                  }`}
                >
                  {val.category}
                </span>
                <div style={{ marginRight: "10px" }}></div>
                <span
                  className={`badge rounded-pill ${
                    isDarkMode ? "bg-light text-dark" : "bg-dark text-light"
                  }`}
                >
                  RS: {val.money}
                </span>
                <div style={{ marginRight: "10px" }}></div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => editHandler(val)}
                >
                  Edit
                </button>
                <div style={{ marginRight: "10px" }}></div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteHandler(val.id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}></div>
      <div className="container-xl d-flex justify-content-center align-items-center">
        <button type="button" className="btn btn-primary" onClick={exportCSV}>
          Download Expenses
        </button>
      </div>
    </div>
  );
};

export default MoneySpend;
