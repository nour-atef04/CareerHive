import React from "react";
import styles from "./ErrorBoundary.module.css";
import Button from "./Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // window.location.reload(); 
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={`${styles.container} ${this.props.className || ""}`} role="alert">
          <h3>Something went wrong.</h3>
          <p className={styles.message}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button 
            onClick={this.handleReset} 
            variant="outline-dark" 
            size="sm"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;