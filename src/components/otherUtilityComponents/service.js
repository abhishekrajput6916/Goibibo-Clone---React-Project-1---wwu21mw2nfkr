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

