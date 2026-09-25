import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              An unexpected error occurred. Try refreshing the page or going back to the homepage.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="pill-button apple-press bg-primary text-primary-foreground h-10 px-6 text-sm inline-flex items-center"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="pill-button apple-press surface-elevated-hover h-10 px-6 text-sm inline-flex items-center text-foreground"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
