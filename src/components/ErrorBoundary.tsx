import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { reportClientError } from "@/services/clientErrorService";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  reported: boolean;
  isReporting: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, reported: false, isReporting: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);

    // Automatically transmit telemetry to Client Error Inbox
    reportClientError(error, window.location.pathname, info?.componentStack);

    const msg = error.message || "";
    const isChunkError =
      msg.includes("dynamically imported module") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("Loading chunk");

    if (isChunkError) {
      const alreadyRetried = sessionStorage.getItem("chunk_error_autoreload");
      if (!alreadyRetried) {
        sessionStorage.setItem("chunk_error_autoreload", "true");
        if ("caches" in window) {
          caches.keys().then((keys) => {
            Promise.all(keys.map((k) => caches.delete(k))).then(() => {
              window.location.reload();
            });
          }).catch(() => {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      }
    }
  }

  handleManualReport = async () => {
    if (!this.state.error) return;
    this.setState({ isReporting: true });
    try {
      await reportClientError(this.state.error, window.location.pathname);
      this.setState({ reported: true });
    } catch {
      this.setState({ reported: true });
    } finally {
      this.setState({ isReporting: false });
    }
  };

  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.message?.includes("dynamically imported module") ||
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("Loading chunk");

      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">{isChunkError ? "🚀" : "⚠️"}</span>
            </div>
            <h1 className="text-xl font-bold mb-2">
              {isChunkError ? "New Deployment Detected" : "Something went wrong"}
            </h1>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {isChunkError
                ? "A fresh build was just deployed to Vercel. Please refresh to load the latest module."
                : "An unexpected error occurred. Try refreshing the page or going back to the homepage."}
            </p>
            {this.state.error && (
              <div className="text-left bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 max-h-48 overflow-y-auto">
                <p className="text-xs font-mono text-destructive font-semibold break-all">
                  {this.state.error.name}: {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <pre className="text-[10px] font-mono text-muted-foreground mt-2 whitespace-pre-wrap break-all">
                    {this.state.error.stack.slice(0, 500)}
                  </pre>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2.5 justify-center">
              <button
                onClick={async () => {
                  try {
                    if ('serviceWorker' in navigator) {
                      const registrations = await navigator.serviceWorker.getRegistrations();
                      for (const reg of registrations) {
                        await reg.unregister();
                      }
                    }
                    if ('caches' in window) {
                      const keys = await caches.keys();
                      for (const k of keys) {
                        await caches.delete(k);
                      }
                    }
                  } catch {}
                  window.location.reload();
                }}
                className="pill-button apple-press bg-primary text-primary-foreground h-10 px-5 text-xs font-bold inline-flex items-center cursor-pointer"
              >
                Refresh Page
              </button>

              <button
                type="button"
                onClick={this.handleManualReport}
                disabled={this.state.reported || this.state.isReporting}
                className={`pill-button apple-press h-10 px-4 text-xs font-bold inline-flex items-center border transition-all cursor-pointer ${
                  this.state.reported
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                    : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                }`}
              >
                {this.state.isReporting
                  ? "Reporting..."
                  : this.state.reported
                  ? "✓ Issue Reported"
                  : "Report Issue"}
              </button>

              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="pill-button apple-press surface-elevated-hover h-10 px-5 text-xs font-bold inline-flex items-center text-foreground cursor-pointer"
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
