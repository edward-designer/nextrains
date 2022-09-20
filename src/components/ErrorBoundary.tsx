import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("NOTE: uncaught error ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-xs p-4 border-b border-b-slate-400">
          Sorry! The app is experiencing some errors. Please reload to try.
        </p>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
