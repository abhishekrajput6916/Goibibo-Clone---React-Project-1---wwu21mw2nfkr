import React from "react";

function getHeaderWithProjectId() {
  return {
    headers: {
      projectId: "wwu21mw2nfkr",
      body: {
        name: "userName",
        email: "userEmail",
        password: "userPassword",
        appType: "bookingportals",
      },
    },
  };
}

export default getHeaderWithProjectId;

//token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODBhNTMwNTRlNmU4MjhmYjBkZWM2YSIsImlhdCI6MTcwMjkyOTcxMiwiZXhwIjoxNzM0NDY1NzEyfQ._YoJqx-YmA7gSebJj8_g3nNrwusdgmvkoyaxi0g5U3o