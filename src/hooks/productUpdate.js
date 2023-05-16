import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function productUpdate() {
  async function update(prod) {
    try {
      const data = await api
        .patch("/product/update/save", prod)
        .then((response) => {
          return response.data;
        });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { update };
}
