import React, { useState, useContext } from "react";
import axios from "axios";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
//import { Context } from "../../context/Product.Context";

function Upload() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const { setFlashMessage } = useFlashMessage();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];

        return object;
      }, {});

      return obj;
    });

    setArray(array);
    console.log(array);
  };

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (file) {
      fileReader.onload = async function (event) {
        const text = event.target.result;
        await csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }

    let prod = Object.values(array[0]);
    console.log("o prod: " + prod, typeof prod, Object.keys(prod));

    console.log("daod: " + prod[0] + " e: " + prod[1]);
    const product = { code: prod[0], new_price: prod[1] };
    let msgText = "";
    let msgType = "";
    console.log("product " + product);
    try {
      const data = await api
        .post("/product/update", product)
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);

    // try {
    //   const prods {code: "16", new_price: "30"}
    //   const data = await api
    //     .patch("/product/update/save", prods)
    //     .then((response) => {
    //       return response.data;
    //     });
    // } catch (error) {
    //   console.log(error);
    // }

    // const formData = new FormData();

    // await Object.keys(prod).forEach((key) => formData.append(key, prod[key]));
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Upload;
