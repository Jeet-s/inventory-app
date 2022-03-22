import * as React from "react";

const styles = {
  width: "100%",
  height: "220px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#292929",
};

export default function BlankCard({ message }) {
  return <div style={styles}>{message}</div>;
}
