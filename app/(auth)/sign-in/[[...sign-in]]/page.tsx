import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white ">
      {/* Welcome section */}
      <div className=" md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-4">
            We are excited to see you again. Sign in to continue your journey.
          </p>
        </div>
      </div>

      {/* Sign-in section */}
      <div className="lg:w-1/2 p-6 flex items-center justify-center m-auto ">
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              baseTheme: dark,
              elements: {
                card: "bg-gray-800 shadow-xl border border-gray-700",
                headerTitle: "text-2xl font-bold text-white",
                headerSubtitle: "text-gray-400 ",
                formButtonPrimary:
                  "bg-purple-600 hover:bg-purple-700 text-white",
                formFieldInput: "bg-gray-700 border-gray-600 text-white",
                formFieldLabel: "text-gray-300",
                footerActionLink: "text-purple-400 hover:text-purple-300",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
