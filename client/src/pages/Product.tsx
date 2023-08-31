import Layout from "components/Layout";
import React from "react";

type Props = {};
const breadCrumbs = [
  {
    title: "Dashboard",
    path: "/products",
  },
];

export default function ProductPage({}: Props) {
  return (
    <Layout title="Product Page" breadCrumbs={breadCrumbs}>
      <div className=""></div>
    </Layout>
  );
}
