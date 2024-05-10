import React from "react";
import Error from "../components/Error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("Error in component did Catch", error);
    console.log("any info", info);
  }
  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
