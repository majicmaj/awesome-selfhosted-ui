import logo from "@/assets/logo.png";

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* <AppWindow className="w-12 h-12 mx-auto text-blue-500 animate-pulse" /> */}
        <img src={logo} className="w-16 h-16 mx-auto animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Loading awesome software...
        </h2>
      </div>
    </div>
  );
}
