import React, { useState, useEffect } from "react";

const MoneySpend = () => {
  const [data, setData] = useState([]);

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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
  };

  console.log(data);
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

  const editHandler = (val) => {
    setCategory(val.category);
    setDescription(val.description);
    setMoney(val.money);

    fetch(
      `https://expense-tracker-e9fa0-default-rtdb.firebaseio.com/expenseamount/${val.id}.json`,
      {
        method: "PATCH",
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

  return (
    <>
      <div className="container-xl d-flex justify-content-center align-items-center">
        <form onSubmit={moneyspenthandler}>
          <div class="mb-7 ">
            <label for="MoneySpent" class="form-label">
              Money Spent
            </label>
            <input
              type="number"
              class="form-control"
              id="MoneySpent"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div class="mb-7 ">
            <label for="Description" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="mb-7 ">
            <label for="Category" class="form-label">
              Category
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Select any option below</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Movie">Movie</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
          <br />

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container-xxl d-flex justify-content-left align-items-center">
        <div>
          {data.map((val, index) => (
            <ul key={index} class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center ">
                <span class="list-group-item list-group-item-action list-group-item-success">
                  Description:{val.description}
                </span>
                <div style={{ marginRight: "10px" }}></div>

                <span class="list-group-item list-group-item-action list-group-item-info">
                  Category: {val.category}
                </span>
                <div style={{ marginRight: "10px" }}></div>

                <span class="badge bg-dark rounded-pill">
                  Money Spent: {val.money}
                </span>

                <div style={{ marginRight: "10px" }}></div>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => editHandler(val)}
                >
                  Edit
                </button>
                <div style={{ marginRight: "10px" }}></div>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => deleteHandler(val.id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoneySpend;
