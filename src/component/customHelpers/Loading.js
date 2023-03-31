import { CircularProgress } from "@material-ui/core";

const Loading = ({ color }) => {
  return (
    <div className="flex justify-center align-center padding">
      <CircularProgress color={color || "primary"} />
    </div>
  );
};

export default Loading;
