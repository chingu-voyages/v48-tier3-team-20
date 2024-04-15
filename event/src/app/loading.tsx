"use client";

interface LoadingPageProps {
  loading: boolean;
}

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = ({ loading }: LoadingPageProps) => {
  return (
    <ClipLoader
      color="#ffafcc"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};
export default LoadingPage;
