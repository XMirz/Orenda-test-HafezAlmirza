import Layout from "components/Layout";
import React from "react";

type Props = {};

const breadCrumbs = [
  {
    title: "Dashboard",
    path: "/",
  },
];

export default function Dashboard({}: Props) {
  return (
    <Layout title="Dashboard Page" breadCrumbs={breadCrumbs}>
      <div className=""></div>
    </Layout>
  );
}
