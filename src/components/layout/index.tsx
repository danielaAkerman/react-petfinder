import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Waiting } from "../Waiting";
import { MyFooter } from "../MyFooter";
import css from "./index.css";
import { CustomHeader } from "../CustomHeader";

function Layout() {
  return (
    <div className={css.root}>
      <div className={css.content}>
        <CustomHeader />
        <Suspense fallback={<Waiting />}>
          <Outlet />
        </Suspense>
      </div>
      <MyFooter />
    </div>
  );
}

export { Layout };
